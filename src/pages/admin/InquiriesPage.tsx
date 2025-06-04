import {useEffect, useState} from 'react'
import InquiryPageHeader from '@/components/admin/inquiries/inquiryPageHeader.tsx'
import InquiryStatusCards from '@/components/admin/inquiries/inquiryStatusCards.tsx'
import InquiryFilters from '@/components/admin/inquiries/inquiryFilters.tsx'
import InquiryTable from '@/components/admin/inquiries/inquiryTable.tsx'
import InquiryDetailsModal from '@/components/admin/inquiries/inquiryDetailsModal.tsx'
import {filterInquiries} from '@/components/admin/inquiries/inquiryUtils.ts'
import {useLoaderData} from 'react-router-dom'
import {Inquiry} from '@/types/customer'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {updateInquiry} from '@/api/admin.ts'

const InquiriesPage = () => {
    const inquiries = useLoaderData() as Inquiry[]
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [filteredInquiries, setFilteredInquiries] = useState<Inquiry[]>(inquiries)

    const queryClient = useQueryClient()

    const updateInquiryStatus = useMutation({
        mutationFn: async (updatedInquiry: Inquiry) => {
            return await updateInquiry(updatedInquiry)
        },
        onMutate: async (newInquiry) => {
            await queryClient.cancelQueries({queryKey: ['inquiries']})

            const previousInquiries = queryClient.getQueryData(['inquiries'])

            queryClient.setQueryData(['inquiries'], (old: Inquiry[]) => {
                    old?.map((item) =>
                        item._id === newInquiry._id ? newInquiry : item
                    )
                }
            )

            return {previousInquiries}
        },
        onError: (error, _, context) => {
            if (context?.previousInquiries) {
                queryClient.setQueryData(['inquiries'], context.previousInquiries)
            }

            console.error('Mutation Error:', error)

            throw error
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['inquiries']})
        }
    })

    useEffect(() => {
        setFilteredInquiries(
            filterInquiries(inquiries, searchTerm, statusFilter)
        )
    }, [inquiries, searchTerm, statusFilter])

    const handleViewDetails = (inquiry: Inquiry) => {
        setSelectedInquiry(inquiry)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedInquiry(null)
    }

    return (
        <div className="container mx-auto space-y-6 p-6">
            <InquiryPageHeader/>

            <InquiryStatusCards/>

            <InquiryFilters
                searchTerm={searchTerm}
                statusFilter={statusFilter}
                onSearchChange={setSearchTerm}
                onStatusFilterChange={setStatusFilter}
            />

            {filteredInquiries &&
                <InquiryTable inquiries={filteredInquiries} onViewDetails={handleViewDetails}/>
            }

            <InquiryDetailsModal
                inquiry={selectedInquiry}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                updateInquiryStatus={updateInquiryStatus.mutate}
                setFilteredInquiries={setFilteredInquiries}
            />
        </div>
    )
}

export default InquiriesPage

import {useEffect, useState} from 'react'
import InquiryPageHeader from '@/components/admin/inquiries/inquiryPageHeader.tsx'
import InquiryStatusCards from '@/components/admin/inquiries/inquiryStatusCards.tsx'
import InquiryFilters from '@/components/admin/inquiries/inquiryFilters.tsx'
import InquiryTable from '@/components/admin/inquiries/inquiryTable.tsx'
import InquiryDetailsModal from '@/components/admin/inquiries/inquiryDetailsModal.tsx'
import {filterInquiries} from '@/components/admin/inquiries/inquiryUtils.ts'
import {useLoaderData} from 'react-router-dom'
import {Inquiry} from '@/types/customer'
import {getInquiries} from '@/api/admin.ts'

const InquiriesPage = () => {
    const [inquiries, setInquiries] = useState<Inquiry[]>(useLoaderData() as Inquiry[])
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [filteredInquiries, setFilteredInquiries] = useState<Inquiry[]>(inquiries)

    useEffect(() => {
        setFilteredInquiries(
            filterInquiries(inquiries, searchTerm, statusFilter)
        )
    }, [inquiries, searchTerm, statusFilter])

    const refreshInquiries = async () => {
        const newInquiries = await getInquiries()
        setInquiries(newInquiries)
        setFilteredInquiries(
            filterInquiries(newInquiries, searchTerm, statusFilter)
        )
    }

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

            <InquiryStatusCards
                inquiries={inquiries}
            />

            <InquiryFilters
                searchTerm={searchTerm}
                statusFilter={statusFilter}
                onSearchChange={setSearchTerm}
                onStatusFilterChange={setStatusFilter}
            />

            {filteredInquiries &&
                <InquiryTable
                    inquiries={filteredInquiries}
                    onViewDetails={handleViewDetails}
                />
            }

            {selectedInquiry &&
                <InquiryDetailsModal
                    inquiry={selectedInquiry}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    refetch={refreshInquiries}
                />}
        </div>
    )
}

export default InquiriesPage

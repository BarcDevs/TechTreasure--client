import {useState} from 'react'
import InquiryPageHeader from '@/components/admin/inquiries/inquiryPageHeader.tsx'
import InquiryStatusCards from '@/components/admin/inquiries/inquiryStatusCards.tsx'
import InquiryFilters from '@/components/admin/inquiries/inquiryFilters.tsx'
import InquiryTable from '@/components/admin/inquiries/inquiryTable.tsx'
import InquiryDetailsModal from '@/components/admin/inquiries/inquiryDetailsModal.tsx'
import {filterInquiries} from '@/components/admin/inquiries/inquiryUtils.ts'
import {useLoaderData} from 'react-router-dom'
import {Inquiry, InquiryStatus} from '@/types/customer'

const InquiriesPage = () => {
    const _inquiries = useLoaderData() as Inquiry[]
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [inquiries, setInquiries] = useState(_inquiries)
    const filteredInquiries = filterInquiries(inquiries, searchTerm, statusFilter)

    const updateInquiryStatus = (inquiryId: string, newStatus: InquiryStatus) => () => {
        setInquiries((prev) =>
            prev.map((inquiry) => (
                inquiry._id === inquiryId ? {...inquiry, status: newStatus} : inquiry))
        )
        if (selectedInquiry && selectedInquiry._id === inquiryId) {
            setSelectedInquiry({...selectedInquiry, status: newStatus})
        }
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

            <InquiryStatusCards/>

            <InquiryFilters
                searchTerm={searchTerm}
                statusFilter={statusFilter}
                onSearchChange={setSearchTerm}
                onStatusFilterChange={setStatusFilter}
            />

            <InquiryTable inquiries={filteredInquiries} onViewDetails={handleViewDetails}/>

            <InquiryDetailsModal
                inquiry={selectedInquiry}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onStatusUpdate={updateInquiryStatus}
            />
        </div>
    )
}

export default InquiriesPage

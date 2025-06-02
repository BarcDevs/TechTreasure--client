import {Inquiry} from '@/types/customer'

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    open: 'bg-blue-100 text-blue-800 border-blue-200',
    resolved: 'bg-green-100 text-green-800 border-green-200'
}

const filterInquiries = (inquiries: Inquiry[], searchTerm: string, statusFilter: string): Inquiry[] => {
    return inquiries.filter((inquiry) => {
        const matchesSearch =
            inquiry.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inquiry.message.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter

        return matchesSearch && matchesStatus
    })
}

const inquiryStatus = {
    open: 'Open',
    pending: 'Pending',
    resolved: 'Resolved',
    all: 'All'
}

export {
    statusColors,
    filterInquiries,
    inquiryStatus
}



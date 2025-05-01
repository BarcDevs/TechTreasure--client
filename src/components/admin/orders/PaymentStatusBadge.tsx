import {Badge} from '@/components/ui/badge.tsx'
import {AlertCircle, ArrowUpDown, CheckCircle} from 'lucide-react'

const PaymentStatusBadge = ({status}: { status: string }) => {
    switch (status) {
        case 'paid':
            return (
                <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                    <CheckCircle className="mr-1 size-3"/> Paid
                </Badge>
            )
        case 'pending':
            return (
                <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
                    <AlertCircle className="mr-1 size-3"/> Pending
                </Badge>
            )
        case 'refunded':
            return (
                <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
                    <ArrowUpDown className="mr-1 size-3"/> Refunded
                </Badge>
            )
        default:
            return <Badge variant="outline">{status}</Badge>
    }
}

export default PaymentStatusBadge

import {Badge} from '@/components/ui/badge.tsx'
import {AlertCircle, CheckCircle, TruckIcon, XCircle} from 'lucide-react'

const FulfillmentStatusBadge = ({status}: { status: string }) => {
    switch (status) {
        case 'pending':
            return (
                <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
                    <AlertCircle className="mr-1 size-3"/> Pending
                </Badge>
            )
        case 'processing':
            return (
                <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
                    <TruckIcon className="mr-1 size-3"/> Processing
                </Badge>
            )
        case 'delivered':
            return (
                <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                    <CheckCircle className="mr-1 size-3"/> Delivered
                </Badge>
            )
        case 'cancelled':
            return (
                <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700">
                    <XCircle className="mr-1 size-3"/> Cancelled
                </Badge>
            )
        default:
            return <Badge variant="outline">{status}</Badge>
    }
}

export default FulfillmentStatusBadge

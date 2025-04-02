import {Badge} from '../ui/badge'
import {twMerge} from 'tailwind-merge'

const StatusBadge = ({status}: { status: string }) => {
    const statusBadgeStyle = {
        active: 'border-green-200 bg-green-50 text-green-700',
        inactive: 'border-gray-200 bg-gray-50 text-gray-700',
        pending: 'border-amber-200 bg-amber-50 text-amber-700',
        processing: 'border-blue-200 bg-blue-50 text-blue-700',
        delivered: 'border-green-200 bg-green-50 text-green-700',
        cancelled: 'border-red-200 bg-red-50 text-red-700'

    }

    return (
        <Badge variant="outline"
               className={twMerge('capitalize', statusBadgeStyle[status as keyof typeof statusBadgeStyle])}>
            {status}
        </Badge>)
}

export default StatusBadge

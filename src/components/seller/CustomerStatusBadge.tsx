import {Badge} from '../ui/badge'
import {twMerge} from 'tailwind-merge'

const CustomerStatusBadge = ({status}: { status: string }) => {
    const statusBadgeStyle = {
        active: 'border-green-200 bg-green-50 text-green-700',
        inactive: 'border-gray-200 bg-gray-50 text-gray-700'
    }

    return (
        <Badge variant="outline"
               className={twMerge('capitalize', statusBadgeStyle[status as keyof typeof statusBadgeStyle])}>
            {status}
        </Badge>)
}

export default CustomerStatusBadge

import {FC} from 'react'

type CustomerSegmentProps = {
    color: string
    label: string
    percentage: number
}

const CustomerSegment: FC<CustomerSegmentProps> = ({ color, label, percentage }) => (
    <div className="flex items-center">
        <div className={`mr-2 size-3 rounded-full ${color === 'primary' ? 'bg-primary' : `bg-${color}`}`} />
        <div>
            <div className="text-sm font-medium">{percentage}%</div>
            <div className="text-xs text-gray-500">{label}</div>
        </div>
    </div>
)

export default CustomerSegment

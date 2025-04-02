import {FC} from 'react'

const CustomerMetricBox: FC<{ label: string, value: number }> = ({label, value}) => (
    <div className="rounded-md bg-gray-50 p-2">
        <div className="text-lg font-semibold">
            {value}
        </div>
        <div className="text-xs text-gray-500">
            {label}
        </div>
    </div>
)

export default CustomerMetricBox

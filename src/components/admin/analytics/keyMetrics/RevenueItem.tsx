import { Progress } from "@/components/ui/progress"
import {formatCurrency} from '@/lib/utils/format.ts'
import {FC} from 'react'

type RevenueItemProps = {
    label: string
    value: number
    total: number
    color: string
}

const RevenueItem: FC<RevenueItemProps> = ({ label, value, total, color }) => (
    <>
        <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">{label}</span>
            <span className="font-medium">{formatCurrency(value)}</span>
        </div>
        <Progress value={(value / total) * 100} className="h-1.5 bg-gray-100">
            <div
                className={`h-full bg-${color} transition-all`}
                style={{ width: `${(value / total) * 100}%` }}
            />
        </Progress>
    </>
)

export default RevenueItem

import { Progress } from '@/components/ui/progress'
import {FC} from 'react'

type OrderStatusBarProps = {
    label: string,
    value: number,
    total: number,
    color: string
}

const OrderStatusBar: FC<OrderStatusBarProps> = ({label, value, total, color}) => (
    <>
        <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">{label}</span>
            <span className="font-medium">{value}</span>
        </div>
        <Progress value={(value / total) * 100} className="h-1.5 bg-gray-100">
            {color !== 'primary' && (
                <div
                    className={`bg-${color} h-full transition-all`}
                    style={{width: `${(value / total) * 100}%`}}
                />
            )}
        </Progress>
    </>
)

export default OrderStatusBar

import {TrendingDown, TrendingUp} from 'lucide-react'
import {FC} from 'react'

type StockMovementSectionProps = {
    title: string
    subtitle: string
    items: {
        name: string
        units: number
        trend: "up" | "down"
    }[]
}

const StockMovementSection: FC<StockMovementSectionProps> = ({ title, subtitle, items }) => (
    <>
        <div className="flex items-center justify-between">
            <div className="text-sm font-medium">
                {title}
            </div>
            <div className="text-sm text-gray-500">
                {subtitle}
            </div>
        </div>

        <div className="space-y-2">
            {items.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                        {item.trend === "up" ? (
                            <TrendingUp className="mr-2 size-4 text-green-500" />
                        ) : (
                            <TrendingDown className="mr-2 size-4 text-red-500" />
                        )}
                        <span>{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">
                        {item.units} units
                    </span>
                </div>
            ))}
        </div>
    </>
)

export default StockMovementSection

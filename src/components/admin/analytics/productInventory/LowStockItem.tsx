import {Package} from 'lucide-react'
import {Progress} from '@/components/ui/progress.tsx'
import {FC} from 'react'

type LowStockItemProps = {
    item: {
        name: string
        stock: number
        threshold: number
    }
}

const LowStockItem: FC<LowStockItemProps> = ({ item }) => (
    <div className="flex items-center justify-between">
        <div>
            <div className="font-medium">{item.name}</div>
            <div className="flex items-center text-xs text-gray-500">
                <Package className="mr-1 size-3" />
                {item.stock} in stock
            </div>
        </div>
        <Progress value={(item.stock / item.threshold) * 100} className="h-2 w-24 bg-gray-100">
            <div
                className="h-full transition-all"
                style={{
                    width: `${(item.stock / item.threshold) * 100}%`,
                    backgroundColor:
                        item.stock < item.threshold * 0.3 ? 'hsl(var(--destructive))' : 'hsl(var(--amber-500))'
                }}
            />
        </Progress>
    </div>
)

export default LowStockItem

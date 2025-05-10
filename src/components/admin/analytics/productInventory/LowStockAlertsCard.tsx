import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card.tsx'
import {Badge} from '@/components/ui/badge.tsx'
import {AlertTriangle} from 'lucide-react'
import {Button} from '@/components/ui/button.tsx'
import LowStockItem from '@/components/admin/analytics/productInventory/LowStockItem.tsx'
import {Link} from 'react-router-dom'

const LowStockAlertsCard = ({data}: { data: ProductAnalytics[] }) => {
    const lowStockItems = data
        .filter(item => item.stock < item.threshold)
        .sort((a, b) => a.stock - b.stock)

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                        Low Stock Alerts
                    </CardTitle>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700">
                        <AlertTriangle className="mr-1 size-3"/>
                        {lowStockItems.length} items
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {lowStockItems.slice(0, 5).map((item, index) => (
                        <LowStockItem key={index} item={item}/>
                    ))}
                </div>
                <Link to={'/admin/products'}>
                    <Button variant="ghost" size="sm" className="mt-4 w-full">
                        View All Inventory
                    </Button>
                </Link>
            </CardContent>
        </Card>
    )
}

export default LowStockAlertsCard

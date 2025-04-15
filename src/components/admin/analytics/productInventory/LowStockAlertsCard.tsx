import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card.tsx'
import {Badge} from '@/components/ui/badge.tsx'
import {AlertTriangle} from 'lucide-react'
import {lowStockItems} from '@/mock/analytics.ts'
import {Button} from '@/components/ui/button.tsx'
import LowStockItem from '@/components/admin/analytics/productInventory/LowStockItem.tsx'

const LowStockAlertsCard = () => (
    <Card>
        <CardHeader>
            <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                    Low Stock Alerts
                </CardTitle>
                <Badge variant="outline" className="bg-amber-50 text-amber-700">
                    <AlertTriangle className="mr-1 size-3" />
                    {lowStockItems.length} items
                </Badge>
            </div>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                {lowStockItems.map((item, index) => (
                    <LowStockItem key={index} item={item} />
                ))}
            </div>
            <Button variant="ghost" size="sm" className="mt-4 w-full">
                View All Inventory
            </Button>
        </CardContent>
    </Card>
)

export default LowStockAlertsCard

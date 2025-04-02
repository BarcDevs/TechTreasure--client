import {Card, CardHeader, CardTitle, CardContent} from '@/components/ui/card'
import {Tag} from 'lucide-react'
import {formatCurrency} from '@/lib/utils/format'
import {promotionsImpact} from '@/mock/analytics.ts'

const PromotionsImpact = ({}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Promotions Impact</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {promotionsImpact.map((promo, index) => (
                        <div key={index}>
                            <div className="mb-2 flex items-center justify-between">
                                <div className="flex items-center">
                                    <Tag className="mr-2 size-4 text-primary"/>
                                    <div>
                                        <div className="font-medium">{promo.name}</div>
                                        <div className="text-xs text-gray-500">{promo.discount} discount</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-medium">{formatCurrency(promo.revenue)}</div>
                                    <div className="text-xs text-gray-500">Revenue</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-center text-xs">
                                <div className="rounded-md bg-gray-50 p-2">
                                    <div className="font-medium">{promo.orders}</div>
                                    <div className="text-gray-500">Orders</div>
                                </div>
                                <div className="rounded-md bg-gray-50 p-2">
                                    <div className="font-medium">{formatCurrency(promo.averageOrder)}</div>
                                    <div className="text-gray-500">Avg. Order</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default PromotionsImpact

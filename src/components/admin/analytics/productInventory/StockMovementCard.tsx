import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card.tsx'
import {Separator} from '@/components/ui/separator.tsx'
import StockMovementSection from '@/components/admin/analytics/productInventory/StockMovementSection.tsx'

const StockMovementCard = () => (
    <Card>
        <CardHeader>
            <CardTitle className="text-base">
                Stock Movement
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <StockMovementSection
                    title="Fast Moving"
                    subtitle="30-day turnover"
                    items={[
                        { name: "Wireless Earbuds Pro", units: 284, trend: "up" },
                        { name: "Smartphone X Pro", units: 126, trend: "up" }
                    ]}
                />

                <Separator />

                <StockMovementSection
                    title="Slow Moving"
                    subtitle="90+ days in stock"
                    items={[
                        { name: "Vintage Record Player", units: 5, trend: "down" },
                        { name: "Digital Camera Basic", units: 8, trend: "down" }
                    ]}
                />
            </div>
        </CardContent>
    </Card>
)

export default StockMovementCard

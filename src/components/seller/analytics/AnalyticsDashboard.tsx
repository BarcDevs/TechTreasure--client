import { useState } from 'react'
import AnalyticsHeader from './AnalyticsHeader.tsx'
import KeyMetricsSection from './keyMetrics/KeyMetricsSection'
import SalesPerformanceSection from './salesPerformance/SalesPerformanceSection'
import CustomerInsightsSection from './CustomerInsightsSection'
import ProductInventorySection from './ProductInventorySection'
// import TrafficMarketingSection from './TrafficMarketingSection'

const AnalyticsDashboard = () => {
    const [salesTimeframe, setSalesTimeframe] = useState<'today' | 'week' | 'month'>('week')

    return (
        <div className="mx-auto max-w-7xl">
            <AnalyticsHeader />

            <KeyMetricsSection
                salesTimeframe={salesTimeframe}
                setSalesTimeframe={setSalesTimeframe}
            />

            {/* Sales Performance */}
            <SalesPerformanceSection />

            {/* Customer Insights */}
            <CustomerInsightsSection />

            {/* Product & Inventory Analytics */}
            <ProductInventorySection />

            {/* Traffic & Marketing Analytics */}
            <section>
                <h2 className="mb-4 text-lg font-semibold text-gray-800">
                    Traffic & Marketing Analytics
                </h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Traffic Sources */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">
                                Traffic Sources
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {trafficSources.map((source, index) => (
                                    <div key={index}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <Globe className="mr-2 size-4 text-gray-400"/>
                                                <span className="font-medium">{source.source}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="mr-2 font-medium">{source.percentage}%</span>
                                                <span
                                                    className={`flex items-center text-xs ${
                                                        source.trend === 'up' ? 'text-green-500' : 'text-red-500'
                                                    }`}
                                                >
                            {source.trend === 'up' ? (
                                <ArrowUp className="mr-1 size-3"/>
                            ) : (
                                <ArrowDown className="mr-1 size-3"/>
                            )}
                                                    {formatPercentage(source.change)}
                          </span>
                                            </div>
                                        </div>
                                        <Progress value={source.percentage} className="mt-1 h-1.5"/>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Campaign Performance */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">
                                Campaign Performance
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {campaignPerformance.map((campaign, index) => (
                                    <div key={index}>
                                        <div className="mb-2 flex items-center justify-between">
                                            <div>
                                                <div className="font-medium">{campaign.name}</div>
                                                <div className="flex items-center text-xs text-gray-500">
                                                    {campaign.type === 'email' ? (
                                                        <Mail className="mr-1 size-3"/>
                                                    ) : (
                                                        <MessageSquare className="mr-1 size-3"/>
                                                    )}
                                                    {campaign.type === 'email' ? 'Email Campaign' : 'SMS Campaign'}
                                                </div>
                                            </div>
                                            <Badge variant="outline" className="bg-green-50 text-green-700">
                                                {((campaign.converted / campaign.sent) * 100).toFixed(1)}%
                                                conversion
                                            </Badge>
                                        </div>

                                        <div className="grid grid-cols-4 gap-2 text-center text-xs">
                                            <div className="rounded-md bg-gray-50 p-2">
                                                <div className="font-medium">{campaign.sent.toLocaleString()}</div>
                                                <div className="text-gray-500">
                                                    Sent
                                                </div>
                                            </div>
                                            <div className="rounded-md bg-gray-50 p-2">
                                                <div
                                                    className="font-medium">{campaign.opened.toLocaleString()}</div>
                                                <div className="text-gray-500">
                                                    Opened
                                                </div>
                                            </div>
                                            <div className="rounded-md bg-gray-50 p-2">
                                                <div
                                                    className="font-medium">{campaign.clicked.toLocaleString()}</div>
                                                <div className="text-gray-500">
                                                    Clicked
                                                </div>
                                            </div>
                                            <div className="rounded-md bg-gray-50 p-2">
                                                <div
                                                    className="font-medium">{campaign.converted.toLocaleString()}</div>
                                                <div className="text-gray-500">
                                                    Converted
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Promotions Impact */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">
                                Promotions Impact
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {promotionsImpact.map((promo, index) => (
                                    <div key={index}>
                                        <div className="mb-2 flex items-center justify-between">
                                            <div className="flex items-center">
                                                <Tag className="mr-2 size-4 text-primary"/>
                                                <div>
                                                    <div className="font-medium">
                                                        {promo.name}
                                                    </div>
                                                    <div
                                                        className="text-xs text-gray-500">
                                                        {promo.discount} discount

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-medium">{formatCurrency(promo.revenue)}</div>
                                                <div className="text-xs text-gray-500">
                                                    Revenue
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 text-center text-xs">
                                            <div className="rounded-md bg-gray-50 p-2">
                                                <div className="font-medium">{promo.orders}</div>
                                                <div className="text-gray-500">
                                                    Orders
                                                </div>
                                            </div>
                                            <div className="rounded-md bg-gray-50 p-2">
                                                <div
                                                    className="font-medium">{formatCurrency(promo.averageOrder)}</div>
                                                <div className="text-gray-500">
                                                    Avg. Order
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    )
}

export default AnalyticsDashboard

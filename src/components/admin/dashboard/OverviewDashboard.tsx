import TotalSalesCard from '@/components/admin/dashboard/TotalSalesCard.tsx'
import OrderStatusCard from '@/components/admin/dashboard/OrderStatusCard.tsx'
import StockAlertsCard from '@/components/admin/dashboard/StockAlertsCard.tsx'
import CustomerMessagesCard from '@/components/admin/dashboard/CustomerMessagesCard.tsx'

const OverviewDashboard = ({}) =>
    (
        <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
                Overview
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <TotalSalesCard/>

                <OrderStatusCard/>

                <StockAlertsCard/>

                <CustomerMessagesCard/>
            </div>
        </section>
    )

export default OverviewDashboard

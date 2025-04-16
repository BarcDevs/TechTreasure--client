import {Card} from '@/components/ui/card'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import OrdersTable from '@/components/admin/orders/OrdersTable'

type OrderStatusTabsProps = {
    filteredOrders: any[]
    activeTab: string
    setActiveTab: (tab: string) => void
    selectedOrders: string[]
    onSelectAll: () => void
    onSelectOrder: (orderId: string) => void
    formatDate: (dateString: string) => string
}

const tabs = {
    all: 'All Orders',
    pending: 'Pending',
    processing: 'Processing',
    delivered: 'Delivered',
    cancelled: 'Cancelled'
}

const OrderStatusTabs = ({
                             filteredOrders,
                             activeTab,
                             setActiveTab,
                             selectedOrders,
                             onSelectAll,
                             onSelectOrder,
                             formatDate
                         }: OrderStatusTabsProps) => (
    <Card className="mb-6 overflow-hidden">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="flex w-full justify-start rounded-none border-b bg-transparent p-0">
                {Object.entries(tabs).map((tab) => (
                    <TabsTrigger
                        value={tab[0]}
                        className="flex-1 rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    >
                        {tab[1]}
                    </TabsTrigger>
                ))}
            </TabsList>

            {Object.keys(tabs).map((tab) => (
                <TabsContent key={tab} value={tab} className="m-0">
                    <OrdersTable
                        orders={filteredOrders}
                        selectedOrders={selectedOrders}
                        onSelectAll={onSelectAll}
                        onSelectOrder={onSelectOrder}
                        formatDate={formatDate}
                    />
                </TabsContent>
            ))}
        </Tabs>
    </Card>
)

export default OrderStatusTabs

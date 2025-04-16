import {Card} from '@/components/ui/card'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import OrdersTable from '@/components/admin/orders/OrdersTable'
import {formatDate} from '@/lib/utils/time.ts'
import {useState} from 'react'

type OrderStatusTabsProps = {
    filteredOrders: any[]
    activeTab: string
    setActiveTab: (tab: string) => void
    selectedOrders: string[]
    setSelectedOrders: (orders: string[]) => void
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
                             setActiveTab
                         }: OrderStatusTabsProps) => {
    const [selectedOrders, setSelectedOrders] = useState<string[]>([])

    const handleSelectAll = () => {
        if (!filteredOrders) return
        if (selectedOrders.length === filteredOrders.length) {
            setSelectedOrders([])
        } else {
            setSelectedOrders(filteredOrders.map((order) => order._id))
        }
    }

    const handleSelectOrder = (orderId: string) => {
        if (selectedOrders.includes(orderId)) {
            setSelectedOrders(selectedOrders.filter((id) => id !== orderId))
        } else {
            setSelectedOrders([...selectedOrders, orderId])
        }
    }

    return (
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
                            onSelectAll={handleSelectAll}
                            onSelectOrder={handleSelectOrder}
                            formatDate={formatDate}
                        />
                    </TabsContent>
                ))}
            </Tabs>
        </Card>
    )
}

export default OrderStatusTabs

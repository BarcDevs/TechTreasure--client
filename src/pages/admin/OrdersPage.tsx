import {useState} from 'react'
import {
    Search,
    Filter,
    Download,
    MoreHorizontal,
    Eye,
    CheckCircle,
    XCircle,
    TruckIcon,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown
} from 'lucide-react'

import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Badge} from '@/components/ui/badge'
import {Card} from '@/components/ui/card'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu'
import {Checkbox} from '@/components/ui/checkbox'
import {useAdminData} from '@/hooks/useAdminData.ts'
import {Order} from '@/types/customer'

export default function OrdersPage() {
    const {orders} = useAdminData({})
    const orders = useLoaderData() as Order[]
    const [activeTab, setActiveTab] = useState('all')
    const [selectedOrders, setSelectedOrders] = useState<string[]>([])
    const [searchQuery, setSearchQuery] = useState('')

    // Filter orders based on active tab and search query
    const filteredOrders = orders?.orders?.filter((order) => {
        // Filter by tab
        if (activeTab === 'pending' && order.status !== 'pending') return false
        if (activeTab === 'processing' && order.status !== 'processing') return false
        if (activeTab === 'delivered' && order.status !== 'delivered') return false
        if (activeTab === 'cancelled' && order.status !== 'cancelled') return false

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            return (
                order._id.toLowerCase().includes(query) ||
                order.customer.toLowerCase().includes(query) ||
                order.email.toLowerCase().includes(query)
            )
        }

        return true
    })

    // Handle select all orders
    const handleSelectAll = () => {
        if (!filteredOrders) return
        if (selectedOrders.length === filteredOrders.length) {
            setSelectedOrders([])
        } else {
            setSelectedOrders(filteredOrders.map((order) => order._id))
        }
    }

    // Handle select individual order
    const handleSelectOrder = (orderId: string) => {
        if (selectedOrders.includes(orderId)) {
            setSelectedOrders(selectedOrders.filter((id) => id !== orderId))
        } else {
            setSelectedOrders([...selectedOrders, orderId])
        }
    }

    // Format date to readable format
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'short', day: 'numeric'}
        return new Date(dateString).toLocaleDateString('en-US', options)
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="mx-auto max-w-7xl">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">Orders</h1>
                    <p className="mt-1 text-gray-500">Manage and process your store orders</p>
                </header>

                {/* Filters and Actions */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-1 items-center gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 size-4 text-gray-400"/>
                            <Input
                                type="search"
                                placeholder="Search orders..."
                                className="pl-8"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" size="icon">
                            <Filter className="size-4"/>
                        </Button>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="hidden sm:flex">
                            <Download className="mr-2 size-4"/>
                            Export
                        </Button>

                        {selectedOrders.length > 0 && (
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Bulk Actions"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="mark-processing">Mark as Processing</SelectItem>
                                    <SelectItem value="mark-delivered">Mark as Delivered</SelectItem>
                                    <SelectItem value="mark-cancelled">Mark as Cancelled</SelectItem>
                                    <SelectItem value="export-selected">Export Selected</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    </div>
                </div>

                {/* Order Status Tabs */}
                {filteredOrders &&
                    <Card className="mb-6 overflow-hidden">
                        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="flex w-full justify-start rounded-none border-b bg-transparent p-0">
                                <TabsTrigger
                                    value="all"
                                    className="flex-1 rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                                >
                                    All Orders
                                </TabsTrigger>
                                <TabsTrigger
                                    value="pending"
                                    className="flex-1 rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                                >
                                    Pending
                                </TabsTrigger>
                                <TabsTrigger
                                    value="processing"
                                    className="flex-1 rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                                >
                                    Processing
                                </TabsTrigger>
                                <TabsTrigger
                                    value="delivered"
                                    className="flex-1 rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                                >
                                    Delivered
                                </TabsTrigger>
                                <TabsTrigger
                                    value="cancelled"
                                    className="flex-1 rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                                >
                                    Cancelled
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="all" className="m-0">
                                <OrdersTable
                                    orders={filteredOrders}
                                    selectedOrders={selectedOrders}
                                    onSelectAll={handleSelectAll}
                                    onSelectOrder={handleSelectOrder}
                                    formatDate={formatDate}
                                />
                            </TabsContent>
                            <TabsContent value="pending" className="m-0">
                                <OrdersTable
                                    orders={filteredOrders}
                                    selectedOrders={selectedOrders}
                                    onSelectAll={handleSelectAll}
                                    onSelectOrder={handleSelectOrder}
                                    formatDate={formatDate}
                                />
                            </TabsContent>
                            <TabsContent value="processing" className="m-0">
                                <OrdersTable
                                    orders={filteredOrders}
                                    selectedOrders={selectedOrders}
                                    onSelectAll={handleSelectAll}
                                    onSelectOrder={handleSelectOrder}
                                    formatDate={formatDate}
                                />
                            </TabsContent>
                            <TabsContent value="delivered" className="m-0">
                                <OrdersTable
                                    orders={filteredOrders}
                                    selectedOrders={selectedOrders}
                                    onSelectAll={handleSelectAll}
                                    onSelectOrder={handleSelectOrder}
                                    formatDate={formatDate}
                                />
                            </TabsContent>
                            <TabsContent value="cancelled" className="m-0">
                                <OrdersTable
                                    orders={filteredOrders}
                                    selectedOrders={selectedOrders}
                                    onSelectAll={handleSelectAll}
                                    onSelectOrder={handleSelectOrder}
                                    formatDate={formatDate}
                                />
                            </TabsContent>
                        </Tabs>
                    </Card>}

                {/* Pagination */}
                {filteredOrders &&
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                            Showing <span className="font-medium">1</span> to <span
                            className="font-medium">10</span> of{' '}
                            <span className="font-medium">
                            {filteredOrders.length}
                        </span> orders
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" disabled>
                                <ChevronLeft className="size-4"/>
                                <span className="sr-only">Previous Page</span>
                            </Button>
                            <Button variant="outline"
                                    size="sm"
                                    className="size-8 p-0"
                            >
                                1
                            </Button>
                            <Button variant="outline"
                                    size="sm"
                                    className="size-8 p-0"
                                    disabled={(filteredOrders.length / 10) <= 2}
                            >
                                2
                            </Button>
                            <Button variant="outline"
                                    size="sm"
                                    className="size-8 p-0"
                                    disabled={(filteredOrders.length / 10) <= 3}
                            >
                                3
                            </Button>
                            <Button variant="outline"
                                    size="sm"
                                    className="size-8 p-0"
                                    disabled={(filteredOrders.length / 10) <= 4}
                            >
                                4
                            </Button>
                            <Button variant="outline"
                                    size="sm"
                                    className="size-8 p-0"
                                    disabled={(filteredOrders.length / 10) <= 5}
                            >
                                5
                            </Button>
                            <Button variant="outline" size="sm">
                                <ChevronRight className="size-4"/>
                                <span className="sr-only">Next Page</span>
                            </Button>
                        </div>
                    </div>}
            </div>
        </div>
    )
}

// Orders Table Component
interface OrdersTableProps {
    orders: Order[]
    selectedOrders: string[]
    onSelectAll: () => void
    onSelectOrder: (orderId: string) => void
    formatDate: (date: string) => string
}

function OrdersTable({orders, selectedOrders, onSelectAll, onSelectOrder, formatDate}: OrdersTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead>
                <tr className="border-b bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                    <th className="px-4 py-3">
                        <Checkbox
                            checked={orders.length > 0 && selectedOrders.length === orders.length}
                            onCheckedChange={onSelectAll}
                            aria-label="Select all orders"
                        />
                    </th>
                    <th className="px-4 py-3">
                        <div className="flex items-center">
                            Order
                            <ArrowUpDown className="ml-1 size-3"/>
                        </div>
                    </th>
                    <th className="px-4 py-3">
                        <div className="flex items-center">
                            Customer
                            <ArrowUpDown className="ml-1 size-3"/>
                        </div>
                    </th>
                    <th className="px-4 py-3">
                        <div className="flex items-center">
                            Date
                            <ArrowUpDown className="ml-1 size-3"/>
                        </div>
                    </th>
                    <th className="px-4 py-3">
                        <div className="flex items-center">
                            Total
                            <ArrowUpDown className="ml-1 size-3"/>
                        </div>
                    </th>
                    <th className="px-4 py-3">Payment</th>
                    <th className="px-4 py-3">Fulfillment</th>
                    <th className="px-4 py-3">Actions</th>
                </tr>
                </thead>
                <tbody className="divide-y">
                {orders.length === 0 ? (
                    <tr>
                        <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                            No orders found
                        </td>
                    </tr>
                ) : (
                    orders.map((order) => (
                        <tr key={order._id} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                                <Checkbox
                                    checked={selectedOrders.includes(order._id)}
                                    onCheckedChange={() => onSelectOrder(order._id)}
                                    aria-label={`Select order ${order._id}`}
                                />
                            </td>
                            <td className="px-4 py-3 font-medium">{order._id}</td>
                            <td className="px-4 py-3">
                                <div>{order.customer}</div>
                                <div className="text-xs text-gray-500">{order.email}</div>
                            </td>
                            <td className="px-4 py-3">{formatDate(order.date)}</td>
                            <td className="px-4 py-3 font-medium">${order.total.toFixed(2)}</td>
                            <td className="px-4 py-3">
                                <PaymentStatusBadge status={order.payment}/>
                            </td>
                            <td className="px-4 py-3">
                                <FulfillmentStatusBadge status={order.status}/>
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="size-8">
                                        <Eye className="size-4"/>
                                        <span className="sr-only">View Order</span>
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="size-8">
                                                <MoreHorizontal className="size-4"/>
                                                <span className="sr-only">More Options</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>View Details</DropdownMenuItem>
                                            <DropdownMenuItem>Update Status</DropdownMenuItem>
                                            <DropdownMenuItem>Contact Customer</DropdownMenuItem>
                                            <DropdownMenuItem>Print Invoice</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    )
}

// Payment Status Badge Component
function PaymentStatusBadge({status}: { status: string }) {
    switch (status) {
        case 'paid':
            return (
                <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                    <CheckCircle className="mr-1 size-3"/> Paid
                </Badge>
            )
        case 'pending':
            return (
                <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
                    <AlertCircle className="mr-1 size-3"/> Pending
                </Badge>
            )
        case 'refunded':
            return (
                <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
                    <ArrowUpDown className="mr-1 size-3"/> Refunded
                </Badge>
            )
        default:
            return <Badge variant="outline">{status}</Badge>
    }
}

// Fulfillment Status Badge Component
function FulfillmentStatusBadge({status}: { status: string }) {
    switch (status) {
        case 'pending':
            return (
                <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
                    <AlertCircle className="mr-1 size-3"/> Pending
                </Badge>
            )
        case 'processing':
            return (
                <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
                    <TruckIcon className="mr-1 size-3"/> Processing
                </Badge>
            )
        case 'delivered':
            return (
                <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                    <CheckCircle className="mr-1 size-3"/> Delivered
                </Badge>
            )
        case 'cancelled':
            return (
                <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700">
                    <XCircle className="mr-1 size-3"/> Cancelled
                </Badge>
            )
        default:
            return <Badge variant="outline">{status}</Badge>
    }
}

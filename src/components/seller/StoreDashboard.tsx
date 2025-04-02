import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card.tsx'
import {Tabs, TabsList, TabsTrigger} from '@/components/ui/tabs.tsx'
import {
    AlertCircle, CheckCircle,
    ClipboardList, Clock,
    DollarSign,
    MessageSquare,
    Package,
    PlusCircle,
    Target,
    TrendingUp, XCircle
} from 'lucide-react'
import {Button} from '@/components/ui/button.tsx'
import {Badge} from '@/components/ui/badge.tsx'
import {useState} from 'react'

const StoreDashboard = ({}) => {
    const [orderTimeframe, setOrderTimeframe] = useState("today")

    return (
        <div className="mx-auto max-w-7xl">
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                    Store Dashboard
                </h1>
                <p className="mt-1 text-gray-500">
                    Welcome back! Here's what's happening with your store today.
                </p>
            </header>

            {/* Overview Dashboard (Top Section) */}
            <section className="mb-8">
                <h2 className="mb-4 text-xl font-semibold text-gray-800">
                    Overview
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Total Sales Card */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">
                                Total Sales
                            </CardTitle>
                            <Tabs defaultValue={orderTimeframe} className="w-[180px]" onValueChange={setOrderTimeframe}>
                                <TabsList className="grid h-7 grid-cols-3">
                                    <TabsTrigger value="today" className="text-xs">
                                        Today
                                    </TabsTrigger>
                                    <TabsTrigger value="week" className="text-xs">
                                        Week
                                    </TabsTrigger>
                                    <TabsTrigger value="month" className="text-xs">
                                        Month
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-bold">
                    {orderTimeframe === "today" && "$1,245.89"}
                      {orderTimeframe === "week" && "$8,942.57"}
                      {orderTimeframe === "month" && "$32,758.12"}
                  </span>
                                <span className="flex items-center text-xs text-green-500">
                    <TrendingUp className="mr-1 size-3" />
                                    {orderTimeframe === "today" && "12%"}
                                    {orderTimeframe === "week" && "8%"}
                                    {orderTimeframe === "month" && "15%"}
                  </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Orders Status Card */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">
                                Orders
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="text-center">
                                    <div className="text-xl font-bold">12</div>
                                    <div className="text-xs text-gray-500">
                                        Pending
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold">8</div>
                                    <div className="text-xs text-gray-500">
                                        Processing
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold">24</div>
                                    <div className="text-xs text-gray-500">
                                        Completed
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stock Alerts Card */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">
                                Stock Alerts
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <AlertCircle className="mr-2 size-5 text-amber-500" />
                                    <span className="text-xl font-bold">
                                            5
                                        </span>
                                </div>
                                <span className="text-sm text-gray-500">
                                        Items Low in Stock
                                    </span>
                            </div>
                            <Button variant="link" className="mt-2 h-auto p-0 text-xs">
                                View Items
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Customer Messages Card */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">
                                Customer Inquiries
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <MessageSquare className="mr-2 size-5 text-blue-500" />
                                    <span className="text-xl font-bold">
                                            7
                                        </span>
                                </div>
                                <span className="text-sm text-gray-500">
                                        Unread Messages
                                    </span>
                            </div>
                            <Button variant="link" className="mt-2 h-auto p-0 text-xs">
                                View Messages
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Quick Actions (Middle Section) */}
            <section className="mb-8">
                <h2 className="mb-4 text-xl font-semibold text-gray-800">
                    Quick Actions
                </h2>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                    <Button variant="outline" className="h-auto flex-col gap-2 p-4 hover:bg-gray-100">
                        <PlusCircle className="size-6 text-blue-500" />
                        <span className="text-sm font-medium">
                                Add New Product
                            </span>
                    </Button>

                    <Button variant="outline" className="h-auto flex-col gap-2 p-4 hover:bg-gray-100">
                        <Package className="size-6 text-amber-500" />
                        <span className="text-sm font-medium">
                                Manage Inventory
                            </span>
                    </Button>

                    <Button variant="outline" className="h-auto flex-col gap-2 p-4 hover:bg-gray-100">
                        <ClipboardList className="size-6 text-green-500" />
                        <span className="text-sm font-medium">
                                View Orders
                            </span>
                    </Button>

                    <Button variant="outline" className="h-auto flex-col gap-2 p-4 hover:bg-gray-100">
                        <DollarSign className="size-6 text-purple-500" />
                        <span className="text-sm font-medium">
                                Check Earnings
                            </span>
                    </Button>

                    <Button variant="outline" className="h-auto flex-col gap-2 p-4 hover:bg-gray-100">
                        <Target className="size-6 text-red-500" />
                        <span className="text-sm font-medium">
                                Marketing
                            </span>
                    </Button>
                </div>
            </section>

            {/* Recent Activity (Bottom Section) */}
            <section>
                <h2 className="mb-4 text-xl font-semibold text-gray-800">

                    Recent Activity

                </h2>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Recent Orders */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">

                                Recent Orders

                            </CardTitle>
                            <CardDescription>

                                Manage your latest orders

                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    {
                                        id: "ORD-7892",
                                        customer: "Alex Johnson",
                                        total: "$129.99",
                                        status: "pending",
                                        time: "10 minutes ago",
                                    },
                                    {
                                        id: "ORD-7891",
                                        customer: "Sarah Williams",
                                        total: "$89.95",
                                        status: "processing",
                                        time: "45 minutes ago",
                                    },
                                    {
                                        id: "ORD-7890",
                                        customer: "Michael Brown",
                                        total: "$245.50",
                                        status: "completed",
                                        time: "2 hours ago",
                                    },
                                    {
                                        id: "ORD-7889",
                                        customer: "Emily Davis",
                                        total: "$75.25",
                                        status: "completed",
                                        time: "3 hours ago",
                                    },
                                ].map((order) => (
                                    <div key={order.id} className="flex items-center justify-between rounded-lg border p-3">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">{order.id}</span>
                                                <Badge
                                                    variant={
                                                        order.status === "pending"
                                                            ? "outline"
                                                            : order.status === "processing"
                                                                ? "secondary"
                                                                : "default"
                                                    }
                                                >
                                                    {order.status}
                                                </Badge>
                                            </div>
                                            <div className="mt-1 text-sm text-gray-500">
                                                {order.customer} • {order.total}
                                            </div>
                                            <div className="mt-1 text-xs text-gray-400">{order.time}</div>
                                        </div>
                                        <div className="flex gap-2">
                                            {order.status === "pending" && (
                                                <>
                                                    <Button size="sm" variant="outline" className="size-8 p-0">
                                                        <CheckCircle className="size-4" />
                                                        <span className="sr-only">
                                                                Accept
                                                            </span>
                                                    </Button>
                                                    <Button size="sm" variant="outline" className="size-8 p-0">
                                                        <XCircle className="size-4" />
                                                        <span className="sr-only">
                                                                Reject
                                                            </span>
                                                    </Button>
                                                </>
                                            )}
                                            {order.status === "processing" && (
                                                <Button size="sm" variant="outline" className="size-8 p-0">
                                                    <CheckCircle className="size-4" />
                                                    <span className="sr-only">
                                                            Complete
                                                        </span>
                                                </Button>
                                            )}
                                            <Button size="sm" variant="outline" className="size-8 p-0">
                                                <Clock className="size-4" />
                                                <span className="sr-only">
                                                        View Details
                                                    </span>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button variant="link" className="mt-4 px-0">
                                View All Orders
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    )
}

export default StoreDashboard

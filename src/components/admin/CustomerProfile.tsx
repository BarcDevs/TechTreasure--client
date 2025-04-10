import {Button} from '@/components/ui/button.tsx'
import {Link} from 'react-router-dom'
import {
    ArrowLeft,
    BarChart3,
    Calendar,
    Clock,
    DollarSign,
    Download, Eye, Heart,
    Mail,
    MapPin, Package,
    Phone,
    Plus,
    ShoppingBag, Star
} from 'lucide-react'
import {Avatar, AvatarFallback} from '@/components/ui/avatar.tsx'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card.tsx'
import {formatDate, formatDateTime, timeSince} from '@/lib/utils/time.ts'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs.tsx'
import {Badge} from '@/components/ui/badge.tsx'
import {FC} from 'react'
import {Customer} from '@/types/customer'
import StatusBadge from '@/components/seller/StatusBadge.tsx'
import CustomerTagBadge from '@/components/seller/CustomerTagBadge.tsx'
import CommunicationTypeBadge from '@/components/seller/CommunicationTypeBadge.tsx'

type CustomerProfileProps = {
    customer: Customer
}

const CustomerProfile: FC<CustomerProfileProps> = ({customer}) =>
    (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="mx-auto max-w-7xl">
                {/* Back Button and Header */}
                <div className="mb-6">
                    <Button variant="ghost" size="sm" asChild className="mb-4">
                        <Link to="/customers">
                            <ArrowLeft className="mr-2 size-4"/>
                            Back to Customers
                        </Link>
                    </Button>

                    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-4">
                            <Avatar className="size-16 border-4 border-background">
                                <AvatarFallback className="text-xl">
                                    {customer.name
                                        .split(' ')
                                        .map((n) => n[0])
                                        .join('')}
                                </AvatarFallback>
                            </Avatar>

                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-2xl font-bold text-gray-900">{customer.name}</h1>
                                    <StatusBadge status={customer.status}/>
                                </div>
                                <p className="text-gray-500">{customer.id}</p>
                                <div className="mt-1 flex flex-wrap gap-1">
                                    {customer.tags.map((tag) => (
                                        <CustomerTagBadge key={tag} tag={tag}/>
                                    ))}
                                    <Button variant="ghost" size="sm" className="h-5 rounded-full p-0 text-xs">
                                        <Plus className="mr-1 size-3"/>
                                        Add Tag
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                                <Mail className="mr-2 size-4"/>
                                Email Customer
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Customer Information - Left Column */}
                    <div className="space-y-6">
                        {/* Contact Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">
                                    Contact Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-2">
                                    <Mail className="mt-0.5 size-4 text-gray-400"/>
                                    <div>
                                        <div className="font-medium">{customer.email}</div>
                                        <div className="text-xs text-gray-500">
                                            Email
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Phone className="mt-0.5 size-4 text-gray-400"/>
                                    <div>
                                        <div className="font-medium">{customer.phone}</div>
                                        <div className="text-xs text-gray-500">
                                            Phone
                                        </div>
                                    </div>
                                </div>
                                {customer.address &&
                                    <div className="flex items-start gap-2">
                                        <MapPin className="mt-0.5 size-4 text-gray-400"/>
                                        <div>
                                            <div className="font-medium">
                                                {customer.address.street}
                                                <br/>
                                                {customer.address.city}, {customer.address.state} {customer.address.zipCode}
                                                <br/>
                                                {customer.address.country}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                Address
                                            </div>
                                        </div>
                                    </div>}
                            </CardContent>
                        </Card>

                        {/* Account Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">
                                    Account Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-2">
                                    <Calendar className="mt-0.5 size-4 text-gray-400"/>
                                    <div>
                                        <div className="font-medium">{formatDate(customer.registrationDate)}</div>
                                        <div className="text-xs text-gray-500">
                                            Registration Date
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Clock className="mt-0.5 size-4 text-gray-400"/>
                                    <div>
                                        <div className="font-medium">{timeSince(customer.registrationDate)}</div>
                                        <div className="text-xs text-gray-500">
                                            Customer For
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Clock className="mt-0.5 size-4 text-gray-400"/>
                                    <div>
                                        <div className="font-medium">
                                            {formatDateTime(customer.lastLogin)}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Last Login
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Customer Metrics */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">
                                    Customer Metrics
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-2">
                                    <ShoppingBag className="mt-0.5 size-4 text-gray-400"/>
                                    <div>
                                        <div className="font-medium">{customer.totalOrders}</div>
                                        <div className="text-xs text-gray-500">
                                            Total Orders
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <DollarSign className="mt-0.5 size-4 text-gray-400"/>
                                    <div>
                                        <div className="font-medium">${customer.totalSpent.toFixed(2)}</div>
                                        <div className="text-xs text-gray-500">
                                            Total Spent
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <BarChart3 className="mt-0.5 size-4 text-gray-400"/>
                                    <div>
                                        <div className="font-medium">
                                            ${customer.averageOrderValue?.toFixed(2) || 'N/A'}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Average Order Value
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Calendar className="mt-0.5 size-4 text-gray-400"/>
                                    <div>
                                        <div className="font-medium">
                                            {formatDate(customer.lastPurchase || 'N/A')}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Last Purchase
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content - Right Column (spans 2 columns) */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Tabs for different sections */}
                        <Tabs defaultValue="orders">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="orders">Orders</TabsTrigger>
                                <TabsTrigger value="activity">Activity</TabsTrigger>
                                <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                                <TabsTrigger value="notes">Notes</TabsTrigger>
                            </TabsList>

                            {/* Orders Tab */}
                            <TabsContent value="orders" className="space-y-4 pt-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-medium">Order History</h3>
                                    <Button variant="outline" size="sm">
                                        <Download className="mr-2 size-4"/>
                                        Export Orders
                                    </Button>
                                </div>

                                {customer.orders && customer.orders.length > 0 ? (
                                    <div className="space-y-4">
                                        {customer.orders.map((order) => (
                                            <Card key={order.id}>
                                                <CardContent className="p-4">
                                                    <div
                                                        className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <h4 className="font-medium">{order.id}</h4>
                                                                <StatusBadge status={order.status}/>
                                                            </div>
                                                            <div
                                                                className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                                                                <div className="flex items-center">
                                                                    <Calendar className="mr-1 size-3"/>
                                                                    {formatDate(order.date)}
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <Package className="mr-1 size-3"/>
                                                                    {order.items} {order.items === 1 ? 'item' : 'items'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <div className="text-right">
                                                                <div
                                                                    className="font-medium">${order.total.toFixed(2)}</div>
                                                            </div>
                                                            <Button variant="outline" size="sm">
                                                                <Eye className="mr-2 size-4"/>
                                                                View
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <Card>
                                        <CardContent className="p-6 text-center text-gray-500">
                                            No orders found for this customer.
                                        </CardContent>
                                    </Card>
                                )}

                                <div className="flex justify-center">
                                    <Button variant="outline">
                                        View All Orders
                                    </Button>
                                </div>
                            </TabsContent>

                            {/* Activity Tab */}
                            <TabsContent value="activity" className="space-y-6 pt-4">
                                {/* Reviews Section */}
                                <div>
                                    <h3 className="mb-4 text-lg font-medium">
                                        Reviews
                                    </h3>

                                    {customer.reviews && customer.reviews.length > 0 ? (
                                        <div className="space-y-4">
                                            {customer.reviews.map((review) => (
                                                <Card key={review.id}>
                                                    <CardContent className="p-4">
                                                        <div className="flex items-start justify-between">
                                                            <div>
                                                                <div className="font-medium">{review.productName}</div>
                                                                <div className="mt-1 flex items-center">
                                                                    {Array.from({length: 5}).map((_, i) => (
                                                                        <Star
                                                                            key={i}
                                                                            className={`size-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
                                                                        />
                                                                    ))}
                                                                    <span
                                                                        className="ml-2 text-xs text-gray-500">{formatDate(review.date)}</span>
                                                                </div>
                                                                <p className="mt-2 text-sm">{review.content}</p>
                                                            </div>
                                                            <Button variant="ghost" size="sm">
                                                                <Eye className="size-4"/>
                                                                <span className="sr-only">
                                                                    View Product
                                                                </span>
                                                            </Button>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    ) : (
                                        <Card>
                                            <CardContent className="p-6 text-center text-gray-500">
                                                No reviews found for this customer.
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>

                                {/* Communications Section */}
                                <div>
                                    <h3 className="mb-4 text-lg font-medium">Communications</h3>

                                    {customer.communications && customer.communications.length > 0 ? (
                                        <div className="space-y-4">
                                            {customer.communications.map((communication) => (
                                                <Card key={communication.id}>
                                                    <CardContent className="p-4">
                                                        <div className="flex items-start justify-between">
                                                            <div>
                                                                <div className="flex items-center gap-2">
                                                                    <CommunicationTypeBadge type={communication.type}/>
                                                                    <span
                                                                        className="font-medium">{communication.subject}</span>
                                                                </div>
                                                                <div
                                                                    className="mt-1 text-xs text-gray-500">
                                                                    {formatDateTime(communication.date)}
                                                                </div>
                                                            </div>
                                                            <Badge variant="outline">{communication.status}</Badge>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    ) : (
                                        <Card>
                                            <CardContent className="p-6 text-center text-gray-500">
                                                No communications found for this customer.
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>
                            </TabsContent>

                            {/* Wishlist Tab */}
                            <TabsContent value="wishlist" className="pt-4">
                                <h3 className="mb-4 text-lg font-medium">Wishlist Items</h3>

                                {customer.wishlist && customer.wishlist.length > 0 ? (
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                        {customer.wishlist.map((item) => (
                                            <Card key={item.id}>
                                                <CardContent className="p-4">
                                                    <div className="flex gap-3">
                                                        <div
                                                            className="size-16 shrink-0 overflow-hidden rounded-md border">
                                                            <img
                                                                src={item.image || '/placeholder.svg'}
                                                                alt={item.name}
                                                                className="size-full object-cover"
                                                            />
                                                        </div>
                                                        <div className="flex flex-1 flex-col">
                                                            <div className="line-clamp-2 font-medium">{item.name}</div>
                                                            <div
                                                                className="mt-1 text-sm font-medium">${item.price.toFixed(2)}</div>
                                                            <div className="mt-auto flex items-center gap-2">
                                                                <Button variant="ghost" size="sm"
                                                                        className="h-8 px-2 text-xs">
                                                                    <Eye className="mr-1 size-3"/>
                                                                    View
                                                                </Button>
                                                                <Button variant="ghost" size="sm"
                                                                        className="h-8 px-2 text-xs">
                                                                    <Heart className="mr-1 size-3 fill-current"/>
                                                                    Remove
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <Card>
                                        <CardContent className="p-6 text-center text-gray-500">
                                            No wishlist items found for this customer.
                                        </CardContent>
                                    </Card>
                                )}
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )

export default CustomerProfile

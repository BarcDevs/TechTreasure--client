import {useState} from 'react'
import {
    Search,
    Filter,
    Download,
    MoreHorizontal,
    Eye,
    Mail,
    MapPin,
    Calendar,
    DollarSign,
    ShoppingBag,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown
} from 'lucide-react'

import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Card} from '@/components/ui/card'
import {Tabs, TabsContent, TabsList} from '@/components/ui/tabs'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu'
import {Checkbox} from '@/components/ui/checkbox'
import {Avatar, AvatarFallback} from '@/components/ui/avatar'
import CUSTOMERS from '@/mock/customers.ts'
import CustomerTagBadge from '@/components/seller/CustomerTagBadge.tsx'
import CustomersTab from '@/components/seller/CustomersTab.tsx'
import StatusBadge from '@/components/seller/StatusBadge.tsx'
import {useQuery} from '@tanstack/react-query'
import {getCustomers} from '@/api/customers.ts'

export default function CustomersPage() {
    const customers = useQuery({
        queryKey: ['customers'],
        queryFn: () => getCustomers(),
        refetchOnWindowFocus: false
    })
    const [activeTab, setActiveTab] = useState('all')
    const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])
    const [searchQuery, setSearchQuery] = useState('')

    // Filter customers based on active tab and search query
    const filteredCustomers = customers.data?.filter((customer) => {
        // Filter by tab
        if (activeTab === 'active' && customer.status !== 'active') return false
        if (activeTab === 'inactive' && customer.status !== 'inactive') return false
        if (activeTab === 'loyal' && !customer.tags.includes('loyal')) return false
        if (activeTab === 'high-value' && !customer.tags.includes('high-value')) return false
        if (activeTab === 'at-risk' && !customer.tags.includes('at-risk')) return false

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            return (
                customer.id.toLowerCase().includes(query) ||
                customer.name.toLowerCase().includes(query) ||
                customer.email.toLowerCase().includes(query) ||
                customer.location.toLowerCase().includes(query)
            )
        }

        return true
    })

    // Handle select all customers
    const handleSelectAll = () => {
        if (!filteredCustomers) return
        if (selectedCustomers.length === filteredCustomers.length) {
            setSelectedCustomers([])
        } else {
            setSelectedCustomers(filteredCustomers.map((customer) => customer.id))
        }
    }

    // Handle select individual customer
    const handleSelectCustomer = (customerId: string) => {
        if (selectedCustomers.includes(customerId)) {
            setSelectedCustomers(selectedCustomers.filter((id) => id !== customerId))
        } else {
            setSelectedCustomers([...selectedCustomers, customerId])
        }
    }

    // Format date to readable format
    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Never'
        const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'short', day: 'numeric'}
        return new Date(dateString).toLocaleDateString('en-US', options)
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="mx-auto max-w-7xl">
                <header className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">Customers</h1>
                            <p className="mt-1 text-gray-500">Manage your customer base and relationships</p>
                        </div>
                    </div>
                </header>

                {/* Filters and Actions */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-1 items-center gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 size-4 text-gray-400"/>
                            <Input
                                type="search"
                                placeholder="Search customers..."
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

                        {selectedCustomers.length > 0 && (
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Bulk Actions"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="add-tag">Add Tag</SelectItem>
                                    <SelectItem value="remove-tag">Remove Tag</SelectItem>
                                    <SelectItem value="send-email">Send Email</SelectItem>
                                    <SelectItem value="export-selected">Export Selected</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    </div>
                </div>

                {/* Customer Segments Tabs */}
                <Card className="mb-6 overflow-hidden">
                    <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="flex w-full justify-start rounded-none border-b bg-transparent p-0">
                            <CustomersTab name={'All Customers'} value={'all'}/>
                            <CustomersTab name={'Active'} value={'active'}/>
                            <CustomersTab name={'Inactive'} value={'inactive'}/>
                            <CustomersTab name={'Loyal'} value={'loyal'}/>
                            <CustomersTab name={'High Value'} value={'high-value'}/>
                            <CustomersTab name={'At Risk'} value={'at-risk'}/>

                        </TabsList>

                        {filteredCustomers && <>
                            <TabsContent value="all" className="m-0">
                                <CustomersTable
                                    customers={filteredCustomers}
                                    selectedCustomers={selectedCustomers}
                                    onSelectAll={handleSelectAll}
                                    onSelectCustomer={handleSelectCustomer}
                                    formatDate={formatDate}
                                />
                            </TabsContent>
                            <TabsContent value="active" className="m-0">
                                <CustomersTable
                                    customers={filteredCustomers}
                                    selectedCustomers={selectedCustomers}
                                    onSelectAll={handleSelectAll}
                                    onSelectCustomer={handleSelectCustomer}
                                    formatDate={formatDate}
                                />
                            </TabsContent>
                            <TabsContent value="inactive" className="m-0">
                                <CustomersTable
                                    customers={filteredCustomers}
                                    selectedCustomers={selectedCustomers}
                                    onSelectAll={handleSelectAll}
                                    onSelectCustomer={handleSelectCustomer}
                                    formatDate={formatDate}
                                />
                            </TabsContent>
                            <TabsContent value="loyal" className="m-0">
                                <CustomersTable
                                    customers={filteredCustomers}
                                    selectedCustomers={selectedCustomers}
                                    onSelectAll={handleSelectAll}
                                    onSelectCustomer={handleSelectCustomer}
                                    formatDate={formatDate}
                                />
                            </TabsContent>
                            <TabsContent value="high-value" className="m-0">
                                <CustomersTable
                                    customers={filteredCustomers}
                                    selectedCustomers={selectedCustomers}
                                    onSelectAll={handleSelectAll}
                                    onSelectCustomer={handleSelectCustomer}
                                    formatDate={formatDate}
                                />
                            </TabsContent>
                            <TabsContent value="at-risk" className="m-0">
                                <CustomersTable
                                    customers={filteredCustomers}
                                    selectedCustomers={selectedCustomers}
                                    onSelectAll={handleSelectAll}
                                    onSelectCustomer={handleSelectCustomer}
                                    formatDate={formatDate}
                                />
                            </TabsContent>
                        </>}
                    </Tabs>
                </Card>

                {/* Pagination */}
                {filteredCustomers &&
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                            Showing <span className="font-medium">1</span> to <span
                            className="font-medium">10</span> of{' '}
                            <span className="font-medium">
                            {filteredCustomers.length}
                        </span> customers
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
                                    disabled={(filteredCustomers.length / 10) <= 2}

                            >
                                2
                            </Button>
                            <Button variant="outline"
                                    size="sm"
                                    className="size-8 p-0"
                                    disabled={(filteredCustomers.length / 10) <= 2}
                            >
                                3
                            </Button>
                            <Button variant="outline"
                                    size="sm"
                                    className="size-8 p-0"
                                    disabled={(filteredCustomers.length / 10) <= 2}
                            >
                                4
                            </Button>
                            <Button variant="outline"
                                    size="sm"
                                    className="size-8 p-0"
                                    disabled={(filteredCustomers.length / 10) <= 2}
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

// Customers Table Component
interface CustomersTableProps {
    customers: typeof CUSTOMERS
    selectedCustomers: string[]
    onSelectAll: () => void
    onSelectCustomer: (customerId: string) => void
    formatDate: (date: string | null) => string
}

function CustomersTable({
                            customers,
                            selectedCustomers,
                            onSelectAll,
                            onSelectCustomer,
                            formatDate
                        }: CustomersTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead>
                <tr className="border-b bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                    <th className="px-4 py-3">
                        <Checkbox
                            checked={customers.length > 0 && selectedCustomers.length === customers.length}
                            onCheckedChange={onSelectAll}
                            aria-label="Select all customers"
                        />
                    </th>
                    <th className="px-4 py-3">
                        <div className="flex items-center">
                            Customer
                            <ArrowUpDown className="ml-1 size-3"/>
                        </div>
                    </th>
                    <th className="px-4 py-3">
                        <div className="flex items-center">
                            Location
                            <ArrowUpDown className="ml-1 size-3"/>
                        </div>
                    </th>
                    <th className="px-4 py-3">
                        <div className="flex items-center">
                            Orders
                            <ArrowUpDown className="ml-1 size-3"/>
                        </div>
                    </th>
                    <th className="px-4 py-3">
                        <div className="flex items-center">
                            Spent
                            <ArrowUpDown className="ml-1 size-3"/>
                        </div>
                    </th>
                    <th className="px-4 py-3">
                        <div className="flex items-center">
                            Last Purchase
                            <ArrowUpDown className="ml-1 size-3"/>
                        </div>
                    </th>
                    <th className="px-4 py-3">
                        Status
                    </th>
                    <th className="px-4 py-3">
                        Tags
                    </th>
                    <th className="px-4 py-3">
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody className="divide-y">
                {customers.length === 0 ? (
                    <tr>
                        <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
                            No customers found
                        </td>
                    </tr>
                ) : (
                    customers.map((customer) => (
                        <tr key={customer.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                                <Checkbox
                                    checked={selectedCustomers.includes(customer.id)}
                                    onCheckedChange={() => onSelectCustomer(customer.id)}
                                    aria-label={`Select customer ${customer.id}`}
                                />
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                    <Avatar className="size-8">
                                        <AvatarFallback>
                                            {customer.name
                                                .split(' ')
                                                .map((n) => n[0])
                                                .join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium">{customer.name}</div>
                                        <div className="text-xs text-gray-500">{customer.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex items-center">
                                    <MapPin className="mr-1 size-3 text-gray-400"/>
                                    <span>{customer.location}</span>
                                </div>
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex items-center">
                                    <ShoppingBag className="mr-1 size-3 text-gray-400"/>
                                    <span>{customer.totalOrders}</span>
                                </div>
                            </td>
                            <td className="px-4 py-3 font-medium">
                                <div className="flex items-center">
                                    <DollarSign className="mr-1 size-3 text-gray-400"/>
                                    <span>${customer.totalSpent.toFixed(2)}</span>
                                </div>
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex items-center">
                                    <Calendar className="mr-1 size-3 text-gray-400"/>
                                    <span>
                                        {formatDate(customer.lastPurchase || null)}
                                    </span>
                                </div>
                            </td>
                            <td className="px-4 py-3">
                                <StatusBadge status={customer.status}/>
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex flex-wrap gap-1">
                                    {customer.tags.length > 0 ? (
                                        customer.tags.map((tag) => <CustomerTagBadge key={tag} tag={tag}/>)
                                    ) : (
                                        <span className="text-xs text-gray-400">No tags</span>
                                    )}
                                </div>
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="size-8">
                                        <Eye className="size-4"/>
                                        <span className="sr-only">View Customer</span>
                                    </Button>
                                    <Button variant="ghost" size="icon" className="size-8">
                                        <Mail className="size-4"/>
                                        <span className="sr-only">
                                            Email Customer
                                        </span>
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="size-8">
                                                <MoreHorizontal className="size-4"/>
                                                <span className="sr-only">
                                                    More Options
                                                </span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                View Profile
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Edit Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                View Orders
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Add Tag
                                            </DropdownMenuItem>
                                            {customer.status === 'active' ? (
                                                <DropdownMenuItem>Mark as Inactive</DropdownMenuItem>
                                            ) : (
                                                <DropdownMenuItem>Mark as Active</DropdownMenuItem>
                                            )}
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

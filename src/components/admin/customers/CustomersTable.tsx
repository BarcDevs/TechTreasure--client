import {ArrowDown, ArrowUp, ArrowUpDown} from 'lucide-react'
import {Checkbox} from '@/components/ui/checkbox'
import CustomerTableRow from '@/components/admin/customers/CustomerTableRow.tsx'
import {Customer} from '@/types/customer'
import {useState} from 'react'

interface CustomersTableProps {
    customers: Customer[]
    selectedCustomers: string[]
    onSelectAll: () => void
    onSelectCustomer: (customerId: string) => void
}

const columnToPropertyMap: Record<string, keyof Customer> = {
    'Customer': 'name',
    'Location': 'location',
    'Orders': 'totalOrders',
    'Spent': 'totalSpent',
    'Last Purchase': 'lastPurchase'
}

const sortCustomers = (customers: Customer[],
                       field: keyof Customer | '',
                       direction: 'asc' | 'desc' | '') => {
    if (field === '' || direction === '') return customers
    return customers.sort((a, b) => {
        const valueA = a[field] || ''
        const valueB = b[field] || ''
        if (valueA < valueB) return direction === 'asc' ? -1 : 1
        if (valueA > valueB) return direction === 'asc' ? 1 : -1
        return 0
    })
}

const CustomersTable = ({
                            customers,
                            selectedCustomers,
                            onSelectAll,
                            onSelectCustomer
                        }: CustomersTableProps) => {
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | ''>('')
    const [sortField, setSortField] = useState<keyof Customer | ''>('')
    const [tableCustomers, setTableCustomers] = useState<Customer[]>(customers)

    const handleSort = (field: keyof Customer) => {
        if (sortField === field)
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        else {
            setSortField(field)
            setSortDirection('asc')
        }

        setTableCustomers(sortCustomers(customers, sortField, sortDirection))
    }

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
                    {['Customer', 'Location', 'Orders', 'Spent', 'Last Purchase'].map((label) => (
                        <th className="px-4 py-3">
                            <div className="flex items-center">
                                {label}
                                <button
                                    onClick={() => handleSort(columnToPropertyMap[label])}
                                    className="ml-1 focus:outline-none"
                                    aria-label={`Sort by ${label}`}
                                >
                                    {sortField === columnToPropertyMap[label] ? (
                                        sortDirection === 'asc' ? (
                                            <ArrowUp className="size-3"/>
                                        ) : (
                                            <ArrowDown className="size-3"/>
                                        )
                                    ) : (
                                        <ArrowUpDown className="size-3"/>
                                    )}
                                </button>
                            </div>
                        </th>
                    ))}
                    {['Status', 'Tags'/*, 'Actions'*/].map((label) => (
                        <th className="px-4 py-3">
                            {label}
                        </th>
                    ))}
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
                    tableCustomers.map((customer) => (
                        <CustomerTableRow
                            key={customer._id}
                            customer={customer}
                            isSelected={selectedCustomers.includes(customer._id)}
                            onSelect={() => onSelectCustomer(customer._id)}
                        />
                    ))
                )}
                </tbody>
            </table>
        </div>
    )
}

export default CustomersTable


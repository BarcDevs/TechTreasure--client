import {Checkbox} from '@/components/ui/checkbox'
import CustomerTableRow from '@/components/admin/customers/CustomerTableRow.tsx'
import {Customer} from '@/types/customer'
import {useState} from 'react'
import SortButton from '@/components/admin/SortButton.tsx'

type CustomersTableProps = {
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

const CustomersTable = ({
                            customers,
                            selectedCustomers,
                            onSelectAll,
                            onSelectCustomer
                        }: CustomersTableProps) => {
    const [tableCustomers, setTableCustomers] = useState<Customer[]>(customers)
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | ''>('')
    const [sortField, setSortField] = useState<string>('')

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
                        <SortButton
                            {...{
                                label,
                                data: customers,
                                setSortedData: setTableCustomers,
                                columnToPropertyMap,
                                setSortField,
                                setSortDirection,
                                sortDirection,
                                sortField
                            }}
                        />
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


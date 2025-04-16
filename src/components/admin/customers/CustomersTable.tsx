import {ArrowUpDown} from 'lucide-react'
import {Checkbox} from '@/components/ui/checkbox'
import CustomerTableRow from '@/components/admin/customers/CustomerTableRow.tsx'
import {Customer} from '@/types/customer'

interface CustomersTableProps {
    customers: Customer[]
    selectedCustomers: string[]
    onSelectAll: () => void
    onSelectCustomer: (customerId: string) => void
}

const CustomersTable = ({
                            customers,
                            selectedCustomers,
                            onSelectAll,
                            onSelectCustomer
                        }: CustomersTableProps) => (
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

export default CustomersTable


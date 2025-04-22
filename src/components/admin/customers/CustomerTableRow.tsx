import {MapPin, ShoppingBag, DollarSign, Calendar} from 'lucide-react'
import {Checkbox} from '@/components/ui/checkbox'
import {Avatar, AvatarFallback} from '@/components/ui/avatar'
import StatusBadge from '@/components/admin/StatusBadge'
import CustomerTagBadge from '@/components/admin/CustomerTagBadge'
import {Customer} from '@/types/customer'
import {formatDate} from '@/lib/utils/time.ts'

type CustomerTableRowProps = {
    customer: Customer
    isSelected: boolean
    onSelect: () => void
}

const CustomerTableRow = ({
                              customer,
                              isSelected,
                              onSelect
                          }: CustomerTableRowProps) => (
    <tr className="hover:bg-gray-50">
        <td className="px-4 py-3">
            <Checkbox
                checked={isSelected}
                onCheckedChange={onSelect}
                aria-label={`Select customer ${customer._id}`}
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
                {customer.lastPurchase ?
                    formatDate(customer.lastPurchase)
                    : 'N/A'}
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
        {/*<td className="px-4 py-3">*/}
        {/*    <CustomerRowActionButtons customer={customer}/>*/}
        {/*</td>*/}
    </tr>
)

export default CustomerTableRow

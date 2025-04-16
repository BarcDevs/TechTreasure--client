import { Eye, Mail, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import CUSTOMERS from '@/mock/customers.ts'

type CustomerRowActionsProps = {
    customer: typeof CUSTOMERS[0]
}

const CustomerRowActionButtons = ({ customer }: CustomerRowActionsProps) => (
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
)

export default CustomerRowActionButtons

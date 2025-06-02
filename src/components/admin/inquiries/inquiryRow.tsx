import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import {TableCell, TableRow} from '@/components/ui/table'
import {Eye} from 'lucide-react'
import {Inquiry} from '@/types/customer'
import {statusColors} from '@/components/admin/inquiries/inquiryUtils.ts'
import {FC} from 'react'
import {formatDate} from '@/lib/utils/time.ts'

type InquiryRowProps = {
    inquiry: Inquiry
    onViewDetails: (inquiry: Inquiry) => void
}

const InquiryRow: FC<InquiryRowProps> = ({inquiry, onViewDetails}) => (
    <TableRow>
        <TableCell>
            <div className="flex flex-col">
                <div className="font-medium">
                    {inquiry.customerName}
                </div>
                <div className="text-sm text-muted-foreground">
                    {inquiry.email}
                </div>
            </div>
        </TableCell>

        <TableCell>
            <div className="text-sm">
                {formatDate(inquiry.date.toString())}
            </div>
        </TableCell>

        <TableCell>
            <div className="max-w-xs truncate text-sm">
                {inquiry.message}
            </div>
        </TableCell>

        <TableCell className={'capitalize'}>
            <Badge
                variant="outline"
                className={statusColors[inquiry.status as keyof typeof statusColors]}
            >
                {inquiry.status}
            </Badge>
        </TableCell>

        <TableCell className="text-right">
            <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(inquiry)}
            >
                <Eye className="mr-1 size-4"/>
                <span className="max-md:hidden">
                    View
                </span>
            </Button>
        </TableCell>
    </TableRow>
)

export default InquiryRow

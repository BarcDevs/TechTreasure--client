import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Table, TableBody, TableHead, TableHeader, TableRow} from '@/components/ui/table'
import {Inquiry} from '@/types/customer'
import InquiryRow from '@/components/admin/inquiries/inquiryRow.tsx'
import {FC} from 'react'

type InquiryTableProps = {
    inquiries: Inquiry[]
    onViewDetails: (inquiry: Inquiry) => void
}

const InquiryTable: FC<InquiryTableProps> = ({inquiries, onViewDetails}) => (
    <Card>
        <CardHeader>
            <CardTitle>
                Inquiries ({inquiries.length})
            </CardTitle>
            <CardDescription>
                A list of all customer inquiries and their current status
            </CardDescription>
        </CardHeader>

        <CardContent>
            <div className="overflow-x-auto rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {['Customer', 'Date', 'Message Preview', 'Status', 'Actions']
                                .map((label) => (
                                    <TableHead
                                        key={label}
                                        className={label === 'Actions' ? 'max-md:hidden' : ''}>
                                        {label}
                                    </TableHead>
                                ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {inquiries.map((inquiry) => (
                            <InquiryRow
                                key={inquiry._id}
                                inquiry={inquiry}
                                onViewDetails={onViewDetails}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </CardContent>
    </Card>
)

export default InquiryTable

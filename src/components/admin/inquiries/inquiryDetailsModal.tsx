import {Label} from '@/components/ui/label'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {Textarea} from '@/components/ui/textarea'
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from '@/components/ui/dialog'
import {User, Mail, Calendar, Package} from 'lucide-react'
import {Inquiry, InquiryStatus} from '@/types/customer'
import {inquiryStatus} from '@/components/admin/inquiries/inquiryUtils.ts'
import {formatDate} from '@/lib/utils/time.ts'

interface InquiryDetailsModalProps {
    inquiry: Inquiry | null
    isOpen: boolean
    onClose: () => void
    onStatusUpdate: (inquiryId: string, newStatus: InquiryStatus) => void
}

const InquiryDetailsModal = ({inquiry, isOpen, onClose, onStatusUpdate}: InquiryDetailsModalProps) => {
    if (!inquiry) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        Inquiry Details
                    </DialogTitle>
                    <DialogDescription>
                        View and manage customer inquiry
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <User className="size-4"/>
                                Customer
                            </Label>
                            <div className="text-sm font-medium">
                                {inquiry.customerName}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <Mail className="size-4"/>
                                Email
                            </Label>
                            <div className="text-sm">
                                {inquiry.email}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <Calendar className="size-4"/>
                                Date
                            </Label>
                            <div className="text-sm">
                                {formatDate(inquiry.date.toString())}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <Package className="size-4"/>
                                Item ID
                            </Label>
                            <div className="text-sm">
                                {inquiry.item}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>
                            Message
                        </Label>
                        <Textarea
                            value={inquiry.message}
                            readOnly
                            className="min-h-[100px]"
                        />
                    </div>

                    {/*<div className="space-y-2">*/}
                    {/*    <Label>*/}
                    {/*        Update Status*/}
                    {/*    </Label>*/}
                    {/*    <Select value={inquiry.status}*/}
                    {/*            onValueChange={*/}
                    {/*                (value: InquiryStatus) => onStatusUpdate(inquiry._id, value)*/}
                    {/*            }>*/}
                    {/*        <SelectTrigger>*/}
                    {/*            <SelectValue/>*/}
                    {/*        </SelectTrigger>*/}
                    {/*        <SelectContent>*/}
                    {/*            {Object.entries(inquiryStatus)*/}
                    {/*                .map((status) => (*/}
                    {/*                    status[0] !== 'all' &&*/}
                    {/*                    <SelectItem value={status[0]}>*/}
                    {/*                        {status[1]}*/}
                    {/*                    </SelectItem>*/}
                    {/*                ))}*/}
                    {/*        </SelectContent>*/}
                    {/*    </Select>*/}
                    {/*</div>*/}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default InquiryDetailsModal

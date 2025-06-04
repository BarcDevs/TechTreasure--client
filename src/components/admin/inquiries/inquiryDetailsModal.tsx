import {Label} from '@/components/ui/label'
import {Textarea} from '@/components/ui/textarea'
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from '@/components/ui/dialog'
import {User, Mail, Calendar, Package} from 'lucide-react'
import {Inquiry, InquiryStatus} from '@/types/customer'
import {formatDate} from '@/lib/utils/time.ts'
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select.tsx'
import {inquiryStatus} from '@/components/admin/inquiries/inquiryUtils.ts'
import {FC} from 'react'

type InquiryDetailsModalProps = {
    inquiry: Inquiry | null
    isOpen: boolean
    onClose: () => void
    updateInquiryStatus: (updatedInquiry: Inquiry) => void
    setFilteredInquiries: (inquiries: Inquiry[]) => void
}

const InquiryDetailsModal: FC<InquiryDetailsModalProps> =
    ({inquiry, isOpen, onClose, updateInquiryStatus, setFilteredInquiries}) => {
        const updateInquiries = (newStatus: InquiryStatus) => {
            if (!inquiry) return

            inquiry.status = newStatus
            //@ts-ignore -- showing that prev is not an array
            setFilteredInquiries((prev) => {
                    if (!Array.isArray(prev)) return prev

                    prev.map((item) => (item._id === inquiry._id ? {...inquiry, status: newStatus} : item))
                }
            )
        }

        return (
            !inquiry ? null :
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

                            <div className="space-y-2">
                                <Label>
                                    Update Status
                                </Label>
                                <Select value={inquiry.status}
                                        onValueChange={(newStatus: InquiryStatus) => {
                                            updateInquiries(newStatus)
                                            if (inquiry) {
                                                updateInquiryStatus({...inquiry, status: newStatus})
                                            }
                                        }}

                                >
                                    <SelectTrigger>
                                        <SelectValue/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {Object.entries(inquiryStatus)
                                                .map((status) => (
                                                    status[0] !== 'all' &&
                                                    <SelectItem
                                                        className={'cursor-pointer'}
                                                        value={status[0]}>
                                                        {status[1]}
                                                    </SelectItem>
                                                ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
        )
    }

export default InquiryDetailsModal

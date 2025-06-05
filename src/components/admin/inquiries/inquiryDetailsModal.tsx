import {FC, useState} from 'react'
import {Label} from '@/components/ui/label'
import {Textarea} from '@/components/ui/textarea'
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from '@/components/ui/dialog'
import {User, Mail, Calendar, Package} from 'lucide-react'
import {Inquiry, InquiryStatus} from '@/types/customer'
import {formatDate} from '@/lib/utils/time.ts'
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select.tsx'
import {inquiryStatus} from '@/components/admin/inquiries/inquiryUtils.ts'
import {updateInquiry} from '@/api/admin.ts'

type InquiryDetailsModalProps = {
    inquiry: Inquiry | null
    isOpen: boolean
    onClose: () => void
    refetch: () => void
}

const InquiryDetailsModal: FC<InquiryDetailsModalProps> =
    ({inquiry, isOpen, onClose, refetch}) => {
        const [currentInquiry, setCurrentInquiry] = useState<Inquiry>(inquiry!)

        const updateCurrentInquiry = async (newStatus: InquiryStatus) => {
            if (!inquiry) return

            setCurrentInquiry((prev) => {
                    const newInquiry = prev
                    newInquiry.status = newStatus

                    return newInquiry
                }
            )

            await updateInquiry(currentInquiry)

            refetch()
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
                                <Select value={currentInquiry.status}
                                        onValueChange={(newStatus: InquiryStatus) => updateCurrentInquiry(newStatus)}

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

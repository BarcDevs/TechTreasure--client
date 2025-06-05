import {inquiryStatus} from '@/components/admin/inquiries/inquiryUtils.ts'
import InquiryStatusCard from '@/components/admin/inquiries/InquiryStatusCard.tsx'
import {FC} from 'react'
import {Inquiry} from '@/types/customer'

type Props = {
    inquiries: Inquiry[]
}

const InquiryStatusCards: FC<Props> = ({inquiries}) => (
    <div className="max-md:flex_col flex_row w-full justify-between gap-4">
        {Object.values(inquiryStatus)
            .map(status => (
                <InquiryStatusCard
                    key={status}
                    inquiries={inquiries}
                    status={status}
                />
            ))}
    </div>
)

export default InquiryStatusCards

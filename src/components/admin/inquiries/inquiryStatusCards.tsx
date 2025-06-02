import {inquiryStatus} from '@/components/admin/inquiries/inquiryUtils.ts'
import InquiryStatusCard from '@/components/admin/inquiries/InquiryStatusCard.tsx'

const InquiryStatusCards = () => (
    <div className="max-md:flex_col flex_row w-full justify-between gap-4">
        {Object.values(inquiryStatus)
            .map(status => (
                <InquiryStatusCard
                    key={status}
                    status={status}
                />
            ))}
    </div>
)

export default InquiryStatusCards

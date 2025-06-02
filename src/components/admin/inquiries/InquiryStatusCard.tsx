import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card.tsx'
import {FC} from 'react'
import {MessageSquare} from 'lucide-react'
import {twMerge} from 'tailwind-merge'
import {statusColors} from '@/components/admin/inquiries/inquiryUtils.ts'
import {Inquiry} from '@/types/customer'
import {useLoaderData} from 'react-router-dom'

type InquiryStatusCardProps = {
    status: string
}

const InquiryStatusCard: FC<InquiryStatusCardProps> = ({status}) => {
    const inquiries = useLoaderData() as Inquiry[]

    return (
        <>
        <Card className={'max:md:w-full md:w-1/2 lg:w-1/4'}>
            <CardHeader className="flex_row items-center justify-between space-y-0 pb-2">
                <CardTitle className="flex_row text-sm font-medium">
                    {status === 'All' ? 'Total Inquiries' : status}
                    {status === 'All' &&
                        <MessageSquare className="size-4 text-muted-foreground"/>
                    }
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className={twMerge(
                    'text-2xl font-bold',
                    statusColors[status.toLowerCase() as keyof typeof statusColors]
                )}>
                    {inquiries
                        .filter(inquiry => inquiry.status === status.toLowerCase()).length ||
                        status === 'All' &&
                        inquiries.length
                    }
                </div>
            </CardContent>
        </Card>
        </>
    )
}

export default InquiryStatusCard

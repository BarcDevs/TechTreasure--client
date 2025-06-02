import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card.tsx'
import {MessageSquare} from 'lucide-react'
import {Button} from '@/components/ui/button.tsx'
import {Link, useLoaderData} from 'react-router-dom'
import {Inquiry} from '@/types/customer'

const CustomerMessagesCard = ({}) => {
    const {inquiries} = useLoaderData() as { inquiries: Inquiry[] }
    const unresolvedInquiries = inquiries
        .filter(inquiry => !(inquiry.status === 'resolved'))

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                    Customer Inquiries
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <MessageSquare className="mr-2 size-5 text-blue-500"/>
                        <span className="text-xl font-bold">
                            {unresolvedInquiries.length}
                        </span>
                    </div>
                    <span className="text-sm text-gray-500">
                        Unresolved Inquiries
                    </span>
                </div>

                <Button variant="link" className="mt-2 h-auto p-0 text-xs">
                    <Link to={'/admin/inquiries'}>
                        View Inquiries
                    </Link>
                </Button>
            </CardContent>
        </Card>

    )
}

export default CustomerMessagesCard

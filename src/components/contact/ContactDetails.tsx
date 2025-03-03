import {Card, CardContent} from '@/components/ui/card.tsx'
import {Mail, Phone} from 'lucide-react'
import {SUPPORT_DETAILS} from '@/constants/footer.ts'

const ContactDetails = ({}) => {
    return (
        <Card className="p-6">
            <CardContent>
                <div className="mb-4 flex items-center gap-4">
                    <Phone className="text-red-500"/>
                    <div>
                        <h2 className="font-semibold">Call Us</h2>
                        <p className="text-gray-600">We are available 24/7.</p>
                        <a href={`tel:${SUPPORT_DETAILS.phone}`}
                           className={'font-medium'}>
                            {SUPPORT_DETAILS.phone}
                        </a>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Mail className="text-red-500"/>
                    <div>
                        <h2 className="font-semibold">Write To Us</h2>
                        <p className="text-gray-600">Response within 24 hours.</p>
                        <a href={`mailto:${SUPPORT_DETAILS.email}?subject=Support`}
                           className={'font-medium'}>
                            {SUPPORT_DETAILS.email}
                        </a>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ContactDetails

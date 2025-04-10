import {Badge} from '@/components/ui/badge.tsx'
import {Mail, MessageSquare} from 'lucide-react'
import {twMerge} from 'tailwind-merge'

const CommunicationTypeBadge = ({type}: { type: string }) => {
    const CommunicationBadgeStyle = {
        email: 'border-blue-200 bg-blue-50 text-blue-700',
        support: 'border-purple-200 bg-purple-50 text-purple-700'
    }

    const communicationTypesLogo = {
        email: <Mail className="mr-1 size-3"/>,
        support: <MessageSquare className="mr-1 size-3"/>
    }

    return (
        <Badge variant="outline"
               className={twMerge('capitalize', CommunicationBadgeStyle[type as keyof typeof CommunicationBadgeStyle])}>
            {communicationTypesLogo[type as keyof typeof communicationTypesLogo]}
            {type}
        </Badge>)
}

export default CommunicationTypeBadge

import {Badge} from '@/components/ui/badge.tsx'
import {Tag} from 'lucide-react'
import {twMerge} from 'tailwind-merge'

const CustomerTagBadge = ({tag}: { tag: string }) => {
    const tagBadgeStyle = {
        loyal: 'border-blue-200 bg-blue-50 text-xs text-blue-700',
        'high-value': 'border-purple-200 bg-purple-50 text-xs text-purple-700',
        'at-risk': 'border-amber-200 bg-amber-50 text-xs text-amber-700',
        new: 'border-green-200 bg-green-50 text-xs text-green-700'
    }

    return (
        <Badge variant="outline" className={twMerge('text-xs capitalize', tagBadgeStyle[tag as keyof typeof tagBadgeStyle])}>
            <Tag className="mr-1 size-2"/>
            {tag.replace(/-/g, ' ')}
        </Badge>
    )
}

export default CustomerTagBadge

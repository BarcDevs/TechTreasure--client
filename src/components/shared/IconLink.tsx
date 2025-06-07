import {Badge} from '@/components/ui/badge.tsx'
import Icon from '@/components/elements/Icon.tsx'
import {FC} from 'react'
import {Link} from 'react-router-dom'

type Props = {
    to: string
    badgeCount: number
    iconPath: string
    iconName: string
    size?: number
}

const IconLink: FC<Props> = ({to, badgeCount, iconPath, iconName, size}) =>
    (
        <Link to={to} className="relative inline-block">
            {badgeCount > 0 &&
                <Badge
                    className={'absolute -right-2 -top-2 size-4 rounded-full bg-red-600 px-1 text-[0.6rem] text-white'}>
                    {badgeCount}
                </Badge>
            }

            <Icon path={iconPath}
                  name={iconName}
                  size={size}
                  hoverable/>
        </Link>
    )

export default IconLink

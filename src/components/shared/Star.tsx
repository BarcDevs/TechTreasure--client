import fullStar from '/assets/icons/star-filled.svg'
import halfStar from '/assets/icons/star-half.svg'
import emptyStar from '/assets/icons/star-empty.svg'
import Icon from '@/components/elements/Icon.tsx'
import {FC} from 'react'
import {useSelector} from 'react-redux'
import {IRootState} from '@/store'

type StarProps = {
    icon: 'empty' | 'half' | 'full'
    rating: number
    onStarClick: (newRating: number) => void
    disabled?: boolean
}

const Star: FC<StarProps> = ({icon, rating, onStarClick, disabled = false}) => {
    const isLoggedIn = useSelector((state: IRootState) => state.auth.isAuthenticated)

    return (
        <button
            onClick={() => onStarClick(rating)}
            disabled={disabled || !isLoggedIn}
        >
            <Icon
                path={icon === 'empty' ?
                    emptyStar :
                    icon === 'half' ?
                        halfStar :
                        fullStar
                }
                name="star"
            />
        </button>
    )
}

export default Star

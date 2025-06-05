import fullStar from '/assets/icons/star-filled.svg'
import halfStar from '/assets/icons/star-half.svg'
import emptyStar from '/assets/icons/star-empty.svg'
import Icon from '@/components/elements/Icon.tsx'
import {FC} from 'react'

type StarProps = {
    icon: 'empty' | 'half' | 'full'
    rating: number
    onStarClick: (newRating: number) => void
}

const Star: FC<StarProps> = ({icon, rating, onStarClick}) =>
    (
        <button
            onClick={() => onStarClick(rating)}
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

export default Star

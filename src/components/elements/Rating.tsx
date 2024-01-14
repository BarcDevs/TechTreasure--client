import fullStar from '/assets/icons/star-filled.svg'
import halfStar from '/assets/icons/star-half.svg'
import emptyStar from '/assets/icons/star-empty.svg'
import Icon from '@/components/elements/Icon.tsx'

const Rating = ({rating}: { rating: number }) => (
    <div className={'inline-flex'}>
        {[...Array(5)].map((_, i) => (
            rating >= i + .9 ? <Icon key={i} path={fullStar} name="star"/> :
                rating >= i + .4 ? <Icon key={i} path={halfStar} name="star"/> :
                    <Icon key={i} path={emptyStar} name="star"/>
        ))}
    </div>
)


export default Rating

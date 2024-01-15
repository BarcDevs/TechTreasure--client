import RowHeader from '@/components/shared/RowHeader.tsx'
import Button from '@/components/elements/Button.tsx'
import {ITEMS} from '@/constants/mocks.ts'
import Item from '@/components/shop/Item.tsx'

const ForYou = ({}) => (
    <div className={'flex-center-col w-full gap-[60px]'}>
        <RowHeader headline={'Just For You'} variant={'white'}>
            {/* TODO add functionality */}
            <Button variant={'white'} text={'View All'}/>
        </RowHeader>
        <ul className={'flex-start-around max-sm:flex-center-col flex-row flex-wrap gap-5'}>
            {[...ITEMS.slice(0, 4)].map(item => (
                <li key={item.id} className={'shrink-0'}>
                    <Item item={item}/>
                </li>
            ))}
        </ul>
    </div>
)

export default ForYou

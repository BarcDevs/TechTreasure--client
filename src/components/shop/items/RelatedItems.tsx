import RowHeader from '@/components/shared/RowHeader.tsx'
import {ITEMS} from '@/constants/mocks.ts'
import {Item} from '@radix-ui/react-select'

const RelatedItems = ({}) => (
    <section className={'flex-center-col w-full gap-[60px]'}>
        <RowHeader headline={'Related Items'}/>
        <ul className={'flex-start-around max-sm:flex-center-col w-full flex-row flex-wrap gap-5'}>
            {[...ITEMS.slice(0, 4)].map(item => (
                <li key={item._id} className={'shrink-0'}>
                    <Item item={item}/>
                </li>
            ))}
        </ul>
    </section>
)

export default RelatedItems

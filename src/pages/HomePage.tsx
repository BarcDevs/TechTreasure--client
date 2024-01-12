import Sidebar from '@/components/home/Sidebar.tsx'
import Hero from '@/components/home/hero.tsx'
import ItemRow from '@/components/shop/ItemRow.tsx'
import {ITEMS} from '@/constants/mocks.ts'
import {Categories} from '@/constants/categories.ts'
import CategoryRow from '@/components/shop/CategoryRow.tsx'

const HomePage = ({}) => {
    return (
        <main className={'flex-col-start my-5 ml-[5vw] w-[90vw] gap-[8.75rem]'}>
            <div className={'inline-flex h-fit w-full justify-start gap-[3.75rem]'}>
                <Sidebar/>
                <Hero/>
            </div>
            {/* TODO add translations */}
            <ItemRow name={'Today\'s'} headline={'Flash Sales'} items={ITEMS} scroll={'horizontal'} timerEnd={new Date('2024-01-20')}/>
            <CategoryRow name={'Categories'} headline={'Browse By Category'} categories={Object.values(Categories)}/>
            <ItemRow name={'This Month'} headline={'Best Selling Products'} items={ITEMS.filter((_, i) => i < 4)} scroll={'none'}/>
            {/* Featured Sale */}
            <ItemRow name={'Our Products'} headline={'Explore Our Products'} items={ITEMS} rows={2} scroll={'vertical'}/>
            {/* New Arrivals */}
            {/* free delivery, customer service 24/7, money-back guarantee */}
        </main>
    )
}

export default HomePage

import Sidebar from '@/components/home/Sidebar.tsx'
import Hero from '@/components/home/hero.tsx'

const HomePage = ({}) => {
    return (
        <main className={'my-5 ml-[5vw]'}>
            <div className={'inline-flex h-fit w-[90vw] justify-start gap-[3.75rem]'}>
                <Sidebar/>
                <Hero/>
            </div>
        </main>
    )
}

export default HomePage

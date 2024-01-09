import Sidebar from '@/components/home/Sidebar.tsx'
import Hero from '@/components/home/hero.tsx'

const HomePage = ({}) => {
    return (
        <main className={'ml-[5vw] mt-10'}>
            <div className={'flex-row'}>
                <Sidebar/>
                <Hero/>
            </div>
        </main>
    )
}

export default HomePage

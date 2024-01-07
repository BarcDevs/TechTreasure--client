import {Outlet} from 'react-router-dom'
import Header from '@/components/layout/Header.tsx'
import Footer from '@/components/layout/Footer.tsx'

const RootLayout = ({}) => {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default RootLayout

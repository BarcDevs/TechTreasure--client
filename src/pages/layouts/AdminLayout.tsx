import {Outlet, useNavigate} from 'react-router-dom'
import Header from '@/components/admin/layout/Header.tsx'
import DesktopSidebar from '@/components/admin/layout/DesktopSidebar.tsx'
import {useSelector} from 'react-redux'
import {IRootState} from '@/store'
import {useEffect} from 'react'
import MobileNavbar from '@/components/admin/layout/MobileNavbar.tsx'

const AdminLayout = ({}) => {
    const isAdmin = useSelector((state: IRootState) => state.auth.isAdmin)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAdmin) {
            navigate('/', {replace: true})
        }
    }, [])

    return (
        <>
            <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
                <DesktopSidebar/>
                <MobileNavbar/>
                <div className="flex_col">
                    <Header/>
                    <Outlet/>
                    {/*<Footer/>*/}
                </div>
            </div>
        </>
    )
}

export default AdminLayout

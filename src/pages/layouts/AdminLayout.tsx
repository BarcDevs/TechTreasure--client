import {Outlet, useNavigate} from 'react-router-dom'
import Header from '@/components/admin/layout/Header.tsx'
import Sidebar from '@/components/admin/layout/Sidebar.tsx'
import {useSelector} from 'react-redux'
import {IRootState} from '@/store'
import {useEffect} from 'react'

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
                <Sidebar/>
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

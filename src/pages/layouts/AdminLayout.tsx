import {Outlet, useNavigate} from 'react-router-dom'

import Header from '@/components/admin/layout/Header.tsx'
import Sidebar from '@/components/admin/layout/Sidebar.tsx'
import {useSelector} from 'react-redux'
import {IRootState} from '@/store'
import {useEffect} from 'react'

const AdminLayout = ({}) => {
    const user = useSelector((state: IRootState) => state.auth.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user || user.role !== 'seller')
            navigate('/', {replace: true})
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

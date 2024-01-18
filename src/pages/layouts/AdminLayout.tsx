import {Outlet} from 'react-router-dom'

import Header from '@/components/admin/layout/Header.tsx'
import Sidebar from '@/components/admin/layout/Sidebar.tsx'

const AdminLayout = ({}) => (
    <>
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            {/*<Sidebar/>*/}
            <div className="flex_col">
                <Header/>
                <Outlet/>
                {/*<Footer/>*/}
            </div>
        </div>

    </>
)

export default AdminLayout

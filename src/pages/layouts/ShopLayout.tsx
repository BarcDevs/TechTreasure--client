import {Outlet} from 'react-router-dom'
import Sidebar from '@/components/layout/Sidebar.tsx'

const ShopLayout = ({}) => (
    <>
        <Sidebar/>
        <Outlet/>
    </>
)


export default ShopLayout

import DesktopNavbar from '@/components/layout/DesktopNavbar.tsx'
import MobileNavbar from '@/components/layout/MobileNavbar.tsx'
import Top from '@/components/layout/Top.tsx'

const Header = ({}) => (
    <header className={'mb-5 border-b'}>
        <Top/>
        <DesktopNavbar/>
        <MobileNavbar/>
    </header>
)


export default Header

import {Link, useLocation} from 'react-router-dom'
import {Package2Icon, SearchIcon} from '@/components/admin/Icons.tsx'
import {Input} from '@/components/ui/input.tsx'
import UserDropdown from '@/components/layout/UserDropdown.tsx'
import {Button, buttonVariants} from '@/components/ui/button.tsx'
import {twMerge} from 'tailwind-merge'

const Header = ({}) => {
    const location = useLocation().pathname
    const isProductsPage = location.startsWith('/seller/products')

    return (
        <header
            className={`flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 lg:h-[60px] ${isProductsPage ? 'justify-between' : 'justify-end'}`}>
            <Link className="lg:hidden" to={'account/me'}>
                <Package2Icon className="size-6"/>
                <span className="sr-only">Account</span>
            </Link>

            {isProductsPage &&
                <div className="w-full flex-1">
                    <form>
                        <div className="relative">
                            <SearchIcon
                                className="absolute left-2.5 top-2.5 size-4 text-gray-500 dark:text-gray-400"/>
                            <Input
                                className="no-focus w-full appearance-none bg-white pl-8 shadow-none dark:bg-gray-950 md:w-2/3 lg:w-1/3"
                                placeholder="Search products..."
                                type="search"
                            />
                        </div>
                    </form>
                </div>}
            <Button className={twMerge(buttonVariants({ variant: "outline" }), 'text-black')} size="sm">
                <Link to={'/'}>Go to Regular Site</Link>
            </Button>
            <UserDropdown/>
        </header>
    )
}

export default Header

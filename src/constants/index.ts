import linkedin from '/assets/icons/linkedin.svg'
import instagram from '/assets/icons/instagram.svg'
import twitter from '/assets/icons/twitter.svg'
import facebook from '/assets/icons/facebook.svg'
import {LANGUAGE, LINK, SOCIAL_LINK} from '@/types/constants'
import {
    ArrowLeftIcon,
    HomeIcon,
    LineChartIcon,
    PackageIcon, ProfileIcon,
    ShoppingCartIcon,
    StoreIcon,
    UsersIcon, UserSupportIcon
} from '@/components/admin/Icons.tsx'

export const APP_NAME = 'TechTreasure'
export const ADMIN_ROOT = '/admin/'

export const LANGUAGES: { [key: string]: LANGUAGE } = {
    ENG: {
        name: 'English',
        code: 'en'
    },
    ESP: {
        name: 'Español',
        code: 'es'
    },
    RUS: {
        name: 'Русский',
        code: 'ru'
    }
}

export const NAVIGATION_LINKS: LINK[] = [
    {
        name: 'Home',
        locale: 'home',
        path: '/'
    },
    {
        name: 'Products',
        locale: 'products',
        path: '/products?page=1'
    },
    {
        name: 'Categories',
        locale: 'categories',
        path: '/categories'
    },
    {
        name: 'Contact',
        locale: 'contact',
        path: '/contact'
    },
    {
        name: 'About',
        locale: 'about',
        path: '/about'
    }
]

export const ADMIN_LINKS = [
    {
        name: 'Home',
        href: ADMIN_ROOT,
        icon: HomeIcon
    },
    {
        name: 'Orders',
        href: `orders`,
        icon: ShoppingCartIcon
    },
    {
        name: 'Products',
        href: `products`,
        icon: PackageIcon
    },
    {
        name: 'Customers',
        href: `customers`,
        icon: UsersIcon
    },
    {
        name: 'Analytics',
        href: `analytics`,
        icon: LineChartIcon
    }
]

export const ADDITIONAL_ADMIN_LINKS = [
    {
        link: {
            name: 'Go to Regular Site',
            href: '/',
            icon: StoreIcon
        }
    },
    {
        link: {
            name: 'Profile',
            href: '/account/me',
            icon: ProfileIcon
        }
    },
    {
        link: {
            name: 'Support',
            href: '/contact',
            icon: UserSupportIcon
        }
    },
    {
        link: {
            name: 'Logout',
            href: '/logout',
            icon: ArrowLeftIcon
        }
    },
]


export const SOCIAL_LINKS: SOCIAL_LINK[] = [
    {name: 'Facebook', url: 'https://www.facebook.com', icon: facebook},
    {name: 'Twitter', url: 'https://www.twitter.com', icon: twitter},
    {name: 'Instagram', url: 'https://www.instagram.com', icon: instagram},
    {name: 'LinkedIn', url: 'https://www.linkedin.com', icon: linkedin}
]

import {LINK} from '@/types/constants'

export const FOOTER_LINKS: {[key: string]: LINK[]} = {
    account: [
        {
            name: 'My Account',
            key: 'account',
            path: '/account'
        },
        {
            name: 'Login / Register',
            key: 'login',
            path: '/login'
        },
        {
            name: 'Cart',
            key: 'cart',
            path: '/cart'
        },
        {
            name: 'Wishlist',
            key: 'wishlist',
            path: '/wishlist'
        },
        {
            name: 'Shop',
            key: 'shop',
            path: '/shop'
        }
    ],
    quickLinks: [
        {
            name: 'Privacy Policy',
            key: 'privacy',
            path: '/policy'
        },
        {
            name: 'Terms Of Use',
            key: 'terms',
            path: '/terms'
        },
        {
            name: 'FAQ',
            key: 'faq',
            path: '/faq'
        },
        {
            name: 'Contact',
            key: 'contact',
            path: '/contact'
        }
    ]
}

export const SUPPORT_DETAILS = {
    address: '111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.',
    email: 'exclusive@gmail.com',
    phone: '+88015-88888-9999'
}

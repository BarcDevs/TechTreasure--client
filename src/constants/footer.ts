import {LINK} from '@/types/constants'

export const FOOTER_LINKS: {[key: string]: LINK[]} = {
    account: [
        {
            name: 'My Account',
            localKey: 'account',
            path: '/account'
        },
        {
            name: 'Login / Register',
            localKey: 'login',
            path: '/login'
        },
        {
            name: 'Cart',
            localKey: 'cart',
            path: '/cart'
        },
        {
            name: 'Wishlist',
            localKey: 'wishlist',
            path: '/wishlist'
        },
        {
            name: 'Shop',
            localKey: 'shop',
            path: '/shop'
        }
    ],
    quickLinks: [
        {
            name: 'Privacy Policy',
            localKey: 'privacy',
            path: '/policy'
        },
        {
            name: 'Terms Of Use',
            localKey: 'terms',
            path: '/terms'
        },
        {
            name: 'FAQ',
            localKey: 'faq',
            path: '/faq'
        },
        {
            name: 'Contact',
            localKey: 'contact',
            path: '/contact'
        }
    ]
}

export const SUPPORT_DETAILS = {
    address: '111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.',
    email: 'exclusive@gmail.com',
    phone: '+88015-88888-9999'
}

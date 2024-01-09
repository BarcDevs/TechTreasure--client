import linkedin from '/assets/icons/linkedin.svg'
import instagram from '/assets/icons/instagram.svg'
import twitter from '/assets/icons/twitter.svg'
import facebook from '/assets/icons/facebook.svg'
import {LINK, SOCIAL_LINK} from '@/types/constants'

export enum LANGUAGES {
    en = 'English',
    es = 'Español',
}

export const NAVIGATION_LINKS: LINK[] = [
    {
        name: 'Home',
        key: 'home',
        path: '/'
    },
    {
        name: 'Contact',
        key: 'contact',
        path: '/contact'
    },
    {
        name: 'About',
        key: 'about',
        path: '/about'
    }
]

export const SOCIAL_LINKS : SOCIAL_LINK[] = [
    {name: 'Facebook', url: 'https://www.facebook.com', icon: facebook},
    {name: 'Twitter', url: 'https://www.twitter.com', icon: twitter},
    {name: 'Instagram', url: 'https://www.instagram.com', icon: instagram},
    {name: 'LinkedIn', url: 'https://www.linkedin.com', icon: linkedin}
]

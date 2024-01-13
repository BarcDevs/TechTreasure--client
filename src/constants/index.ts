import linkedin from '/assets/icons/linkedin.svg'
import instagram from '/assets/icons/instagram.svg'
import twitter from '/assets/icons/twitter.svg'
import facebook from '/assets/icons/facebook.svg'
import {LANGUAGE, LINK, SOCIAL_LINK} from '@/types/constants'

export const APP_NAME = 'TechTreasure'

export const LANGUAGES: {[key: string]: LANGUAGE} = {
    ENG: {
        name: 'English',
        code: 'en'
    },
    ESP: {
        name: 'Español',
        code: 'es'
    }
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

export const SOCIAL_LINKS: SOCIAL_LINK[] = [
    {name: 'Facebook', url: 'https://www.facebook.com', icon: facebook},
    {name: 'Twitter', url: 'https://www.twitter.com', icon: twitter},
    {name: 'Instagram', url: 'https://www.instagram.com', icon: instagram},
    {name: 'LinkedIn', url: 'https://www.linkedin.com', icon: linkedin}
]

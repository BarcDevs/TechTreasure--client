import linkedin from '/assets/icons/linkedin.svg'
import instagram from '/assets/icons/instagram.svg'
import twitter from '/assets/icons/twitter.svg'
import facebook from '/assets/icons/facebook.svg'

export enum LANGUAGES {
    ENG = 'English',
    ESP = 'Español',
}

export const NAVIGATION_LINKS = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'Contact',
        path: '/contact'
    },
    {
        name: 'About',
        path: '/about'
    }
]

export const SOCIAL_LINKS = [
    {name: 'Facebook', url: 'https://www.facebook.com', icon: facebook},
    {name: 'Twitter', url: 'https://www.twitter.com', icon: twitter},
    {name: 'Instagram', url: 'https://www.instagram.com', icon: instagram},
    {name: 'LinkedIn', url: 'https://www.linkedin.com', icon: linkedin}
]

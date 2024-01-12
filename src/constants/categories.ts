import {Category} from '@/types'

export const Categories: {[name: string]: Category } = {
    smartphones: {
        id: 'c0',
        name: 'smartphones',
        icon: '/assets/icons/categories/smartphones.svg'
    },
    computers: {
        id: 'c1',
        name: 'computers',
        icon: '/assets/icons/categories/computers.svg'
    },
    screens: {
        id: 'c2',
        name: 'screens',
        icon: '/assets/icons/categories/screens.svg'
    },
    wearables: {
        id: 'c3',
        name: 'wearables',
        icon: '/assets/icons/categories/wearables.svg'
    },
    cameras: {
        id: 'c4',
        name: 'cameras',
        icon: '/assets/icons/categories/cameras.svg'
    },
    audioDevices: {
        id: 'c5',
        name: 'audioDevices',
        icon: '/assets/icons/categories/audio-devices.svg'
    },
    gaming: {
        id: 'c6',
        name: 'gaming',
        icon: '/assets/icons/categories/gaming.svg'
    },
    homeTech: {
        id: 'c7',
        name: 'homeTech',
        icon: '/assets/icons/categories/home-tech.svg'
    },
    computerComponents: {
        id: 'c8',
        name: 'computerComponents',
        icon: '/assets/icons/categories/components.svg'
    },
    accessories: {
        id: 'c9',
        name: 'accessories',
        icon: '/assets/icons/categories/accessories.svg'
    },
    vrArDevices: {
        id: 'c10',
        name: 'vrArDevices',
        icon: '/assets/icons/categories/ar-vr.svg'
    },
    drones: {
        id: 'c11',
        name: 'drones',
        icon: '/assets/icons/categories/drones.svg'
    },
    printers3D: {
        id: 'c12',
        name: 'printers3D',
        icon: '/assets/icons/categories/3d-printers.svg'
    },
    software: {
        id: 'c13',
        name: 'software',
        icon: '/assets/icons/categories/software.svg'
    },
    techServices: {
        id: 'c14',
        name: 'techServices',
        icon: '/assets/icons/categories/services.svg'
    }
}

export const GROUPED_CATEGORIES: (Category | { name_key: string; subcategories: Category[] })[] = [
    {
        name_key: 'devices',
        subcategories: [Categories.smartphones, Categories.computers, Categories.wearables, Categories.cameras, Categories.audioDevices]
    },
    Categories.gaming,
    Categories.homeTech,
    {
        name_key: 'componentsAndAccessories',
        subcategories: [Categories.computerComponents, Categories.accessories]
    },
    {
        name_key: 'emergingTech',
        subcategories: [Categories.vrArDevices, Categories.drones, Categories.printers3D]
    },
    {
        name_key: 'softwareAndServices',
        subcategories: [Categories.software, Categories.techServices]
    }
]

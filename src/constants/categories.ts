import {Category} from '@/types'

export const Categories: {[name: string]: Category } = {
    smartphones: {
        _id: 'c0',
        name: 'smartphones',
        icon: '/assets/icons/categories/smartphones.svg'
    },
    computers: {
        _id: 'c1',
        name: 'computers',
        icon: '/assets/icons/categories/computers.svg'
    },
    screens: {
        _id: 'c2',
        name: 'screens',
        icon: '/assets/icons/categories/screens.svg'
    },
    wearables: {
        _id: 'c3',
        name: 'wearables',
        icon: '/assets/icons/categories/wearables.svg'
    },
    cameras: {
        _id: 'c4',
        name: 'cameras',
        icon: '/assets/icons/categories/cameras.svg'
    },
    audioDevices: {
        _id: 'c5',
        name: 'audioDevices',
        icon: '/assets/icons/categories/audio-devices.svg'
    },
    gaming: {
        _id: 'c6',
        name: 'gaming',
        icon: '/assets/icons/categories/gaming.svg'
    },
    homeTech: {
        _id: 'c7',
        name: 'homeTech',
        icon: '/assets/icons/categories/home-tech.svg'
    },
    computerComponents: {
        _id: 'c8',
        name: 'computerComponents',
        icon: '/assets/icons/categories/components.svg'
    },
    accessories: {
        _id: 'c9',
        name: 'accessories',
        icon: '/assets/icons/categories/accessories.svg'
    },
    vrArDevices: {
        _id: 'c10',
        name: 'vrArDevices',
        icon: '/assets/icons/categories/ar-vr.svg'
    },
    drones: {
        _id: 'c11',
        name: 'drones',
        icon: '/assets/icons/categories/drones.svg'
    },
    printers3D: {
        _id: 'c12',
        name: 'printers3D',
        icon: '/assets/icons/categories/3d-printers.svg'
    },
    software: {
        _id: 'c13',
        name: 'software',
        icon: '/assets/icons/categories/software.svg'
    },
    techServices: {
        _id: 'c14',
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

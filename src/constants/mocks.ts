import {Product} from '@/types'
import {Categories} from '@/constants/categories.ts'

const customDescription = "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive."

export const ITEMS: Product[] = [
    {
        _id: "i109",
        name: 'HAVIT HV-G92 Gamepad',
        description: customDescription,
        mainImage: {
            white: '/assets/images/items/item-1-white.png',
            red: '/assets/images/items/item-1-red.png'
        },
        images: {
            white: ['/assets/images/items/item-1-white-1.png',
                '/assets/images/items/item-1-white-2.png',
                '/assets/images/items/item-1-white-3.png',
                '/assets/images/items/item-1-white-4.png'],
            red: []
        },
        rating: 4.3,
        votes: 584,
        sale: 40,
        price: 120,
        oldPrice: 160,
        category: Categories.gaming.name,
        sizes: ['S', 'M', 'L', 'XL'],
        shippingFee: 20,
        colors: [
            {name: 'red', hex: '#DB4444'},
            {name: 'white', hex: '#A0BCE0'}
        ],
        defaultColor: 'white',
        stock: 164
    },
    {
        _id: "i110",
        name: 'AK-900 Wired Keyboard',
        description: customDescription,
        mainImage: '/assets/images/items/item-2.png',
        rating: 4.8,
        votes: 283,
        sale: 35,
        price: 960,
        oldPrice: 1160,
        category: Categories.accessories.name,
        shippingFee: 0,
        stock: 0
    },
    {
        _id: "i111",
        name: 'IPS LCD Gaming Monitor',
        description: customDescription,
        mainImage: '/assets/images/items/item-3.png',
        rating: 4.9,
        votes: 157,
        price: 370,
        sale: 30,
        oldPrice: 400,
        category: Categories.screens.name,
        shippingFee: 0,
        stock: 6
    },
    {
        _id: "i112",
        name: 'RGB liquid CPU Cooler',
        description: customDescription,
        mainImage: '/assets/images/items/item-4.png',
        rating: 4.1,
        votes: 97,
        price: 160,
        sale: 0,
        oldPrice: 170,
        category: Categories.computerComponents.name,
        shippingFee: 0,
        stock: 70
    },
    {
        _id: "i113",
        name: 'ASUS FHD Gaming Laptop',
        description: customDescription,
        mainImage: '/assets/images/items/item-5.png',
        rating: 5,
        votes: 987,
        price: 700,
        category: Categories.computers.name,
        shippingFee: 7,
        stock: 5330
    },
    {
        _id: "i114",
        name: 'GP11 Shooter USB Gamepad',
        description: customDescription,
        mainImage: {
            red: '/assets/images/items/item-6.png',
            black: '/assets/images/items/item-6.png'
        },
        rating: 3.8,
        votes: 109,
        price: 120,
        isNew: true,
        colors: [
            {name: 'black', hex: '#000000'},
            {name: 'red', hex: '#DB4444'}
        ],
        defaultColor: 'black',
        category: Categories.gaming.name,
        shippingFee: 3,
        stock: 6780
    }
]

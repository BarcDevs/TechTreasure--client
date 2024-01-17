import {Cart, Product} from '@/types'
import {Categories} from '@/constants/categories.ts'

export const ITEMS: Product[] = [
    {
        id: "i109",
        name: 'HAVIT HV-G92 Gamepad',
        image: '/assets/images/items/item-1.png',
        rating: 4.3,
        votes: 584,
        discount: 40,
        price: 120,
        oldPrice: 160,
        category: Categories.gaming.name
    },
    {
        id: "i110",
        name: 'AK-900 Wired Keyboard',
        image: '/assets/images/items/item-2.png',
        rating: 4.8,
        votes: 283,
        discount: 35,
        price: 960,
        oldPrice: 1160,
        category: Categories.accessories.name
    },
    {
        id: "i111",
        name: 'IPS LCD Gaming Monitor',
        image: '/assets/images/items/item-3.png',
        rating: 4.9,
        votes: 157,
        price: 370,
        discount: 30,
        oldPrice: 400,
        category: Categories.screens.name
    },
    {
        id: "i112",
        name: 'RGB liquid CPU Cooler',
        image: '/assets/images/items/item-4.png',
        rating: 4.1,
        votes: 97,
        price: 160,
        discount: 0,
        oldPrice: 170,
        category: Categories.computerComponents.name
    },
    {
        id: "i113",
        name: 'ASUS FHD Gaming Laptop',
        image: '/assets/images/items/item-5.png',
        rating: 5,
        votes: 987,
        price: 700,
        category: Categories.computers.name
    },
    {
        id: "i114",
        name: 'GP11 Shooter USB Gamepad',
        image: '/assets/images/items/item-6.png',
        rating: 3.8,
        votes: 109,
        price: 120,
        new: true,
        colors: [
            {name: 'Black', hex: '#000000'},
            {name: 'Red', hex: '#DB4444'}
        ],
        category: Categories.gaming.name
    }
]

export const CART : Cart = {
    items: [{
        id: "i109",
        name: 'HAVIT HV-G92 Gamepad',
        image: '/assets/images/items/item-1.png',
        rating: 4.3,
        votes: 584,
        discount: 40,
        price: 120,
        oldPrice: 160,
        category: Categories.gaming.name,
        quantity: 1,
        subtotal: 120,
        totalDiscount: 40
    },
    {
        id: "i110",
        name: 'AK-900 Wired Keyboard',
        image: '/assets/images/items/item-2.png',
        rating: 4.8,
        votes: 283,
        discount: 35,
        price: 960,
        oldPrice: 1160,
        category: Categories.accessories.name,
        quantity: 3,
        subtotal: 2880,
        totalDiscount: 35
    },
    {
        id: "i111",
        name: 'IPS LCD Gaming Monitor',
        image: '/assets/images/items/item-3.png',
        rating: 4.9,
        votes: 157,
        price: 370,
        discount: 30,
        oldPrice: 400,
        category: Categories.screens.name,
        quantity: 1,
        subtotal: 370,
        totalDiscount: 30
    }],
    subtotal: 2880+370+120,
    cartDiscount: 150,
    shipping: 0,
    total: 2880+370+120-150
}

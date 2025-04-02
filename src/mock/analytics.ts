import {StoreProduct} from '@/types'

const salesData = {
    today: {value: 2458.35, change: 12.5, trend: 'up'},
    week: {value: 18942.57, change: 8.3, trend: 'up'},
    month: {value: 72758.12, change: 15.2, trend: 'up'}
}

const ordersData = {
    total: 1248,
    completed: 982,
    pending: 189,
    canceled: 77,
    change: 5.8,
    trend: 'up'
}

const customersData = {
    total: 8542,
    new: {
        daily: 24,
        weekly: 168,
        monthly: 642
    },
    growth: 12.4,
    trend: 'up'
}

const revenueData = {
    total: 72758.12,
    profits: 43654.87,
    taxes: 14551.62,
    fees: 8723.49,
    refunds: 5828.14
}

const bestSellingProducts: StoreProduct[] = [
    {name: 'Wireless Earbuds Pro', sales: 284, revenue: 14200},
    {name: 'Ultra HD Smart TV - 55"', sales: 142, revenue: 99400},
    {name: 'Smartphone X Pro', sales: 126, revenue: 88200},
    {name: 'Laptop Elite Book', sales: 98, revenue: 78400},
    {name: 'Smart Watch Series 5', sales: 87, revenue: 26100}
]

const customerRetention = {
    new: 35,
    returning: 65
}

const averageOrderValue = {
    current: 124.85,
    previous: 118.42,
    change: 5.4,
    trend: 'up'
}

const peakHours = [
    {hour: '9 AM', orders: 42},
    {hour: '10 AM', orders: 56},
    {hour: '11 AM', orders: 78},
    {hour: '12 PM', orders: 95},
    {hour: '1 PM', orders: 102},
    {hour: '2 PM', orders: 87},
    {hour: '3 PM', orders: 76},
    {hour: '4 PM', orders: 68},
    {hour: '5 PM', orders: 82},
    {hour: '6 PM', orders: 91},
    {hour: '7 PM', orders: 110},
    {hour: '8 PM', orders: 89}
]

const lowStockItems = [
    {name: 'Wireless Earbuds Pro', stock: 8, threshold: 10},
    {name: 'Gaming Controller Elite', stock: 5, threshold: 15},
    {name: 'Smart Home Hub', stock: 3, threshold: 10},
    {name: 'Fitness Tracker Band', stock: 7, threshold: 20}
]

const productReviews = [
    {name: 'Wireless Earbuds Pro', rating: 4.8, reviews: 284},
    {name: 'Ultra HD Smart TV - 55"', rating: 4.6, reviews: 142},
    {name: 'Smartphone X Pro', rating: 4.7, reviews: 126},
    {name: 'Laptop Elite Book', rating: 4.5, reviews: 98},
    {name: 'Smart Watch Series 5', rating: 4.2, reviews: 87}
]

const trafficSources = [
    {source: 'Organic Search', percentage: 42, change: 8.5, trend: 'up'},
    {source: 'Direct', percentage: 25, change: 2.1, trend: 'up'},
    {source: 'Social Media', percentage: 18, change: 15.4, trend: 'up'},
    {source: 'Referral', percentage: 10, change: -3.2, trend: 'down'},
    {source: 'Email', percentage: 5, change: 12.8, trend: 'up'}
]

const campaignPerformance = [
    {name: 'Summer Sale', type: 'email', sent: 15000, opened: 6750, clicked: 2250, converted: 450},
    {name: 'New Arrivals', type: 'email', sent: 12000, opened: 5400, clicked: 1800, converted: 360},
    {name: 'Flash Sale', type: 'sms', sent: 8000, opened: 6400, clicked: 2400, converted: 720}
]

const promotionsImpact = [
    {name: 'SUMMER25', discount: '25%', orders: 284, revenue: 14200, averageOrder: 50},
    {name: 'NEWCUST10', discount: '10%', orders: 142, revenue: 9940, averageOrder: 70},
    {name: 'FLASH50', discount: '50%', orders: 326, revenue: 16300, averageOrder: 50}
]

export {
    salesData,
    ordersData,
    customersData,
    customerRetention,
    averageOrderValue,
    peakHours,
    lowStockItems,
    productReviews,
    trafficSources,
    campaignPerformance,
    promotionsImpact,
    revenueData,
    bestSellingProducts
}

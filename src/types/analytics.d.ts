type TrendDirection = 'up' | 'down';

type SalesPeriod = {
    value: number;
    change: number;
    trend: TrendDirection;
};

type Sales = {
    today: SalesPeriod;
    week: SalesPeriod;
    month: SalesPeriod;
    year: SalesPeriod;
};

type Orders = {
    total: number;
    completed: number;
    pending: number;
    canceled: number;
    change: number;
    trend: TrendDirection;
};

type Customers = {
    total: number;
    new: {
        daily: number;
        weekly: number;
        monthly: number;
    };
    growth: number;
    trend: TrendDirection;
};

type Revenue = {
    total: number;
    profits: number;
    taxes: number;
    fees: number;
    refunds: number;
};

type ProductAnalytics = {
    name: string
    stock: number
    threshold: number
    sales: number
    revenue: number
    rating: number
    reviews: number
}

type CustomerRetention = {
    new: number;
    returning: number;
};

type AverageOrderValue = {
    current: number;
    previous: number;
    change: number;
    trend: TrendDirection;
};

type PeakHour = {
    hour: string;
    orders: number;
};

type TrafficSource = {
    source: string;
    percentage: number;
    change: number;
    trend: TrendDirection;
};

type CampaignPerformance = {
    name: string;
    type: string;
    sent: number;
    opened: number;
    clicked: number;
    converted: number;
};

type PromotionImpact = {
    name: string;
    discount: string;
    orders: number;
    revenue: number;
    averageOrder: number;
};

type Analytics = {
    _id: string;
    sales: Sales;
    orders: Orders;
    customers: Customers;
    revenue: Revenue;
    productsAnalytics: ProductAnalytics[];
    customerRetention: CustomerRetention;
    averageOrderValue: AverageOrderValue;
    peakHours: PeakHour[];
    trafficSources: TrafficSource[];
    campaignPerformance: CampaignPerformance[];
    promotionsImpact: PromotionImpact[];
    createdAt: { $date: string };
    updatedAt: { $date: string };
};

type StoreStats = {
    products: number
    customers: number
    orders: number
};

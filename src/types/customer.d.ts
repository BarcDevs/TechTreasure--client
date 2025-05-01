type Note = {
    id: number;
    author: string;
    date: string;
    content: string;
};

type Order = {
    _id: string;
    customer: string;
    customerName: string;
    email: string;
    date: string;
    total: number;
    items: number;
    payment: 'paid' | 'unpaid' | 'pending';
    status: 'pending' | 'processing' | 'completed' | 'delivered' | 'cancelled';
};

type WishlistItem = {
    id: string;
    name: string;
    price: number;
    image: string;
};

type Review = {
    id: number;
    productId: string;
    productName: string;
    rating: number;
    date: string;
    content: string;
};

type Communication = {
    id: number;
    type: string;
    subject: string;
    date: string;
    status: string;
};

type EmailPreferences = {
    marketing: boolean;
    orderUpdates: boolean;
    productReviews: boolean;
    newsletter: boolean;
};

type Address = {
    street: string;
    city: string;
    country: string;
    state: string;
    zipCode: string;
};

type Customer = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    address?: Address;
    totalOrders: number;
    totalSpent: number;
    status: string;
    registrationDate: string;
    lastPurchase?: string;
    tags: string[];
    notes?: Note[];
    orders?: Order[];
    wishlist: ?WishlistItem[];
    reviews?: Review[];
    communications?: Communication[];
    emailPreferences?: EmailPreferences;
    lastLogin: string;
    averageOrderValue?: number;
};

export {Note, Order, WishlistItem, Review, Communication, EmailPreferences, Customer}

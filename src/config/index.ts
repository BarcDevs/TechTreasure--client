export const config = {
    SERVER_URL: import.meta.env.VITE_SERVER_URL,

    TIMER_END_TIME: new Date('2025-06-15'),

    COUPON_CODES: {
        '1234': 5,
        '5pc': 5,
        'yay': 10
    } as Record<string, number>,
}

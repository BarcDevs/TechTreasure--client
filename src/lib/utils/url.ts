export const imageUrl = (path: string | undefined) =>
    `${import.meta.env.VITE_APP_API_BASE_URL ?? 'http://localhost:3000'}/images/products/${path}`

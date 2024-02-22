export const imageUrl = (path: string | undefined) =>
    `${import.meta.env.VITE_SERVER_URL}/images/products/${path}`

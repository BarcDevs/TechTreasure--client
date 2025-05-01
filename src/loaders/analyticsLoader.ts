import {getAnalytics} from '@/api/admin.ts'

const analyticsLoader = async (): Promise<Analytics> => {
    try {
        return await getAnalytics()
    } catch (error) {
        throw new Response('Failed to fetch analytics', {status: 500})
    }
}

export default analyticsLoader

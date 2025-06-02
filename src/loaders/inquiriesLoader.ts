import {getInquiries} from '@/api/admin.ts'

const inquiriesLoader = async (): Promise<Inquiry[]> => {
    try {
        return await getInquiries()
    } catch (error) {
        throw new Response('Failed to fetch inquiries', {status: 500})
    }
}

export default inquiriesLoader

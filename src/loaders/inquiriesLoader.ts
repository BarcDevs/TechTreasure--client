import {getInquiries} from '@/api/admin.ts'
import {Inquiry} from '@/types/customer'
import {queryClient} from '@/api'

const inquiriesLoader = async (): Promise<Inquiry[]> => {
    try {
        const inquiries = await getInquiries()
        queryClient.setQueryData(['inquiries'], inquiries)

        return inquiries
    } catch (error) {
        throw new Response('Failed to fetch inquiries', {status: 500})
    }
}

export default inquiriesLoader

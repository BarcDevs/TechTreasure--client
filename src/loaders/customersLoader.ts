import {getCustomers} from '@/api/admin.ts'
import {Customer} from '@/types/customer'

const customersLoader = async (): Promise<Customer[]> => {
    try {
        return await getCustomers()
    } catch (error) {
        throw new Response('Failed to fetch customers', {status: 500})
    }
}

export default customersLoader

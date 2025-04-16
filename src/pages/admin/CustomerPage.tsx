import {useParams} from 'react-router-dom'
import {useQuery} from '@tanstack/react-query'
import CustomerProfile from '@/components/admin/CustomerProfile.tsx'
import {getCustomer} from '@/api/admin.ts'

export default function CustomerProfilePage() {
    const {id} = useParams()
    const customer = useQuery({
        queryKey: ['customers', id],
        queryFn: () => getCustomer(id as string),
        refetchOnWindowFocus: false
    })

    return (customer.data ?
            <CustomerProfile customer={customer.data} /> : (
                    customer.isFetching ? <p>Loading...</p> :
                        customer.isError ?
                            <p>Error! Could not load item. please try again, if error persists please contact support</p> :
                            <p>Item not found</p>
        )
    )
}

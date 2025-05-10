import ProductForm from '@/components/admin/products/form/ProductForm.tsx'
import {useQuery} from '@tanstack/react-query'
import {Product} from '@/types'
import {useParams} from 'react-router-dom'
import {getProduct} from '@/api/products.ts'

const EditItemPage = ({}) => {
    const {id} = useParams()
    const {data: product} = useQuery<Product>({
        queryKey: ['store', 'items', id],
        queryFn: () => getProduct(id as string),
        refetchOnWindowFocus: false
    })

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Edit Product</h1>
            </div>

            <ProductForm product={product}/>
        </main>
    )
}


export default EditItemPage

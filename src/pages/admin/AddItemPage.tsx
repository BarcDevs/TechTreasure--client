import ProductForm from '@/components/admin/products/ProductForm.tsx'

const AddItemPage = ({}) => (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex items-center">
            <h1 className="font-semibold text-lg md:text-2xl">Add Product</h1>
        </div>

        <ProductForm/>
    </main>
)


export default AddItemPage

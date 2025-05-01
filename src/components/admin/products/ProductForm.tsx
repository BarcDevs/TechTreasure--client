import {Button} from '@/components/ui/button'
import {Input, InputProps} from '@/components/ui/input'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {Textarea, TextareaProps} from '@/components/ui/textarea.tsx'
import {useEffect, useState} from 'react'
import {Color, Product, ProductWithColors, Admin} from '@/types'
import {Categories} from '@/constants/categories.ts'
import RequiredInput from '@/components/elements/RequiredInput.tsx'
import {Form, FormField, FormItem, FormMessage} from '@/components/ui/form.tsx'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {FormImage, ProductForm as ProductFormType, productFormSchema} from '@/validations/productForm.ts'
import ColorInput from '@/components/admin/products/form/ColorInput.tsx'
import SizeInput from '@/components/admin/products/form/SizeInput.tsx'
import ImageInput from '@/components/admin/products/form/ImageInput.tsx'
import {useNavigate} from 'react-router-dom'
import {useMutation} from '@tanstack/react-query'
import {createProduct, updateProduct} from '@/api/products.ts'
import {useSelector} from 'react-redux'
import {IRootState} from '@/store'
import {queryClient} from '@/api'
import {getImagesFromProduct} from '@/lib/utils/image.ts'
import {getErrorMessage} from '@/lib/utils/error.ts'
import {toast} from '@/hooks/use-toast.ts'

type ProductFormProps = {
    product?: Product
}
const ProductForm = ({product}: ProductFormProps) => {
    const navigate = useNavigate()
    const {mutate, isError, error, isPending} = useMutation({
        mutationFn: product ? updateProduct : createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['items']
            })
            navigate('/admin/products')
        }
    })

    const shopId = (useSelector((state: IRootState) => state.auth.user) as Admin).store
    const [colors, setColors] = useState<Color[]>([])
    const [sizes, setSizes] = useState<string[]>([])
    const [mainImage, setMainImage] = useState<FormImage[]>([])
    const [images, setImages] = useState<FormImage[]>([])
    const [saleInputMode, setSaleInputMode] = useState<'%' | '$'>('%')

    const form = useForm<ProductFormType>({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
            name: '',
            description: '',
            price: '',
            shippingFee: '',
            stock: '',
            category: '',
            colors: [],
            sizes: [],
            mainImage: [],
            images: [],
            sale: '',
            saleEndsAt: new Date(),
            isNew: false
        }
    })

    useEffect(() => {
        if (product) {
            getImagesFromProduct(product.mainImage)
                .then(res => setMainImage(() => res))

            if (product.images)
                getImagesFromProduct(product.images)
                    .then(res => setImages(() => res))

            setColors(((product as ProductWithColors).colors || []))
            setSizes(product.sizes || [])

            Object.entries(product).forEach(([key, value]) => {
                if (key !== 'colors' && key !== 'sizes' && key !== 'mainImage' && key !== 'images')
                    form.setValue((key as keyof ProductFormType), String(value))
            })
        }
    }, [form, product])

    useEffect(() => {
        if (colors.length > 0)
            form.setValue('colors', colors)
        if (sizes.length > 0)
            form.setValue('sizes', sizes)
        if (mainImage.length > 0)
            form.setValue('mainImage', mainImage)
        if (images.length > 0)
            form.setValue('images', images)
    }, [colors, sizes, mainImage, images, form])

    const handleInputMode = (inputMode: '%' | '$') => {
        const price = Number(form.getValues('price'))
        const sale = Number(form.getValues('sale'))

        if (inputMode === '$') {
            setSaleInputMode(() => '$')
            if (price > 0 && sale > 0)
                form.setValue('sale', (price * sale / 100).toFixed(2))
        } else {
            setSaleInputMode(() => '%')
            if (price > 0 && sale > 0)
                form.setValue('sale',
                    Math.min(Number((sale / price * 100).toFixed(0)), 100) + '')
        }
    }

    const onSubmit = (values: ProductFormType) => {
        if (saleInputMode === '$') {
            const {price, sale} = values
            values.sale = Math.min(Number((Number(sale) / Number(price) * 100).toFixed(0)), 100) + ''
        }

        if (saleInputMode === '$') {
            const {price, sale} = values
            values.sale = Math.min(Number((Number(sale) / Number(price) * 100).toFixed(0)), 100) + ''
        }

        if (product)
            mutate({
                id: product._id,
                data: values,
                shopId
            })
        else
            mutate({
                id: '',
                data: values,
                shopId
            })
    }

    useEffect(() => {
        isError && toast({
            title: 'Error submitting product',
            description:
                getErrorMessage(error) ||
                'Something went wrong. Please try again.',
            variant: 'destructive'
        })
    }, [isError, error])

    return (
        <Form {...form}>
            <form
                className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"
                onSubmit={form.handleSubmit(onSubmit)}>
                {/*region name*/}
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <>
                            <RequiredInput>
                                <Input className="w-full" placeholder="Product Name" type="text" {...field}/>
                                <FormMessage/>
                            </RequiredInput>
                        </>
                    )}/>
                {/*endregion*/}

                {/*region category*/}
                <FormField
                    control={form.control} name="category"
                    render={({field}) =>
                        (<FormItem>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="no-focus w-full capitalize">
                                    <SelectValue placeholder={field.value ?
                                        Object.values(Categories).find(cat => cat._id === field.value)?.name ?? 'Category'
                                        : 'Category'}/>
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(Categories).map(category => (
                                        <SelectItem key={category._id}
                                                    value={category._id}
                                                    className={'cursor-pointer capitalize'}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>)
                    }/>
                {/*endregion*/}

                <SizeInput {...{sizes, setSizes, formControl: form.control}}/>

                <ColorInput {...{colors, setColors, formControl: form.control}}/>

                {/*region price, stock, shipping fee*/}
                <div className="flex_row w-full gap-4 md:col-span-2">
                    <FormField name={'stock'}
                               control={form.control}
                               render={({field}) => (
                                   <>
                                       <Input className="hide-arrows w-1/3" placeholder="Stock"
                                              type="number" {...field}/>
                                       <FormMessage/>
                                   </>
                               )}/>

                    <FormField name={'price'}
                               control={form.control}
                               render={({field}) => (
                                   <>
                                       <RequiredInput className="w-1/3">
                                           <Input className={'hide-arrows'}
                                                  placeholder="Price"
                                                  type="number"
                                                  {...field}/>
                                           <FormMessage/>
                                       </RequiredInput>
                                   </>
                               )}/>

                    <FormField name={'shippingFee'}
                               control={form.control}
                               render={({field}) => (
                                   <FormItem className={'w-1/3'}>
                                       <Input className="hide-arrows"
                                              id="shipping-fee"
                                              placeholder="Shipping Fee"
                                              type="number"
                                              {...field}/>
                                       <FormMessage/>
                                   </FormItem>
                               )}/>
                </div>
                <div className="w-full md:col-span-2">
                    <FormField name={'description'}
                               control={form.control}
                               render={({field}) => (
                                   <>
                                       <RequiredInput>
                                           <Textarea className="h-32 w-full"
                                                     placeholder="Product Description"
                                                     {...field as TextareaProps}/>
                                           <FormMessage/>
                                       </RequiredInput>
                                   </>
                               )}/>
                </div>
                {/*endregion*/}

                <ImageInput type={'main'}
                            images={mainImage}
                            setImages={setMainImage}
                            colors={colors}
                            formControl={form.control}
                />

                <ImageInput type={'additional'}
                            images={images}
                            setImages={setImages}
                            colors={colors}
                            formControl={form.control}
                />

                {/*region sale and new*/}
                <div className="grid w-full grid-cols-2 gap-4 md:col-span-2">
                    <FormField name={'isNew'} control={form.control} render={({field}) => (
                        <FormItem className="flex items-center gap-2">
                            <Input className="form-checkbox mt-2 h-5 w-5 text-indigo-600 accent-red-500"
                                   type="checkbox"
                                   id={'is-new'}
                                   {...field as unknown as InputProps}/>
                            <label htmlFor={'is-new'}>Mark as New</label>
                        </FormItem>
                    )}/>

                    <div className="flex items-center gap-2">
                        <FormField name={'sale'} control={form.control} render={({field}) => (
                            <>
                                <div
                                    className={'flex-row-start w-5/6 rounded focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'}>
                                    <Input className="no-focus hide-arrows w-full rounded-r-none"
                                           placeholder="Sale Amount"
                                           type="number"
                                           {...field}
                                           max={saleInputMode === '%' ? 100 : undefined}/>
                                    <Select defaultValue="%" onValueChange={handleInputMode}>
                                        <SelectTrigger className="no-focus w-20 rounded-l-none">
                                            <SelectValue placeholder="Select"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="%">%</SelectItem>
                                            <SelectItem value="$">$</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <FormMessage/>
                            </>
                        )}/>

                        <span>Ends:</span>
                        <FormField name={'saleEndsAt'}
                                   control={form.control}
                                   render={({field}) => (
                                       <div className={'flex_col'}>
                                           <Input
                                               className="w-full"
                                               type="date"
                                               {...field as unknown as InputProps}
                                               onChange={e => field.onChange(new Date(e.target.value))}
                                               value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                           />
                                           <FormMessage/>
                                       </div>
                                   )}/>
                    </div>
                </div>
                {/*endregion*/}

                <div className={'flex-center-row mt-4 w-full md:col-span-2'}>
                    <Button className="col-span-full px-12 md:col-span-1"
                            type="submit"
                        // disabled={isPending}
                    >
                        {isPending ? 'Saving...' : 'Save Product'}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
export default ProductForm

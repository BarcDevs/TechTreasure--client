/**
 * v0 by Vercel.
 * @see https://v0.dev/t/dTDjcLyxsAQ
 */
import {Button} from "@/components/ui/button"
import {Input, InputProps} from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Textarea, TextareaProps} from '@/components/ui/textarea.tsx'
import {useEffect, useState} from 'react'
import {Color, Product, ProductWithColors} from '@/types'
import {Categories} from '@/constants/categories.ts'
import RequiredInput from '@/components/elements/RequiredInput.tsx'
import {Form, FormField, FormItem, FormMessage} from '@/components/ui/form.tsx'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {ProductForm as ProductFormType, productFormSchema} from '@/validations/productForm.ts'
import ColorInput from '@/components/admin/products/form/ColorInput.tsx'
import SizeInput from '@/components/admin/products/form/SizeInput.tsx'
import ImageInput, {ImageState} from '@/components/admin/products/form/ImageInput.tsx'
import {getImageFile} from '@/lib/utils.ts'
// import {useSubmit} from 'react-router-dom'

type ProductFormProps = {
    product?: Product
}
const ProductForm = ({product}: ProductFormProps) => {
    // const submit = useSubmit()
    const [colors, setColors] = useState<Color[]>([])
    const [sizes, setSizes] = useState<string[]>([])
    const [mainImage, setMainImage] = useState<ImageState[]>([])
    const [images, setImages] = useState<ImageState[]>([])
    const [saleInputMode, setSaleInputMode] = useState<'%' | '$'>('%')

    const extractImagesFromColorsObj = (colors: { [key: string]: string | string[] }) => (
        Object.entries(colors)
            .map(async ([key, value]) => (
                typeof value === 'string' ? {
                        image: await getImageFile(value),
                        color: key
                    } :
                    await Promise.all(value.map(async image => ({
                        image: await getImageFile(image),
                        color: key
                    })))
            ))
    )

    useEffect(() => {
        if (product) {
            const mainImages =
                typeof product?.mainImage === 'string' ? [
                    Promise.resolve(getImageFile(product.mainImage))
                    // @ts-ignore
                ] : Promise.all(extractImagesFromColorsObj(product?.mainImage!))

            if (product?.images) {
                const images = Array.isArray(product?.images) ?
                    product?.images.map(async image => await getImageFile(image)) :
                    // @ts-ignore
                    extractImagesFromColorsObj(product?.images)

                    (async () => setImages(await Promise.all(images) as ImageState[]))()
            }

            (async () => setMainImage(await mainImages as ImageState[]))()
            setColors(((product as ProductWithColors).colors || []))
            setSizes(product.sizes || [])
        }
    }, [])

    const form = useForm<ProductFormType>({
        resolver: zodResolver(productFormSchema),
        defaultValues: !product ? {
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
        } : {
            ...product,
            price: product.price + '',
            sale: product.sale + '',
            shippingFee: product.shippingFee + '',
            stock: product.stock + '',
            mainImage: [],
            images: []
        }
    })

    useEffect(() => {
        if (colors.length > 0)
            form.setValue('colors', colors)
        if (sizes.length > 0)
            form.setValue('sizes', sizes)
        if (mainImage.length > 0)
            form.setValue('mainImage', mainImage)
        if (images.length > 0)
            form.setValue('images', images)
    }, [colors, sizes, mainImage, images])

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
        // submit(values, {method: 'post', replace: true})
        console.log(values)
        // todo convert sale to percentage
    }

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
                                <SelectTrigger className="w-full capitalize">
                                    <SelectValue placeholder="Category"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(Categories).map(category => (
                                        <SelectItem key={category.id}
                                                    value={category.name}
                                                    className={'capitalize cursor-pointer'}>
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
                <div className="w-full flex_row gap-4 md:col-span-2">
                    <FormField name={'stock'}
                               control={form.control}
                               render={({field}) => (
                                   <>
                                       <Input className="w-1/3 hide-arrows" placeholder="Stock"
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
                                           <Textarea className="w-full h-32"
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
                <div className="w-full md:col-span-2 grid grid-cols-2 gap-4">
                    <FormField name={'isNew'} control={form.control} render={({field}) => (
                        <FormItem className="flex items-center gap-2">
                            <Input className="form-checkbox h-5 w-5 text-indigo-600 accent-red-500 mt-2"
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
                                    className={'flex-row-start w-5/6 focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 rounded'}>
                                    <Input className="w-full rounded-r-none no-focus hide-arrows"
                                           placeholder="Sale Amount"
                                           type="number"
                                           {...field}
                                           max={saleInputMode === '%' ? 100 : undefined}/>
                                    <Select defaultValue="%" onValueChange={handleInputMode}>
                                        <SelectTrigger className="w-20 rounded-l-none no-focus">
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
                        <FormField name={'saleEndsAt'} control={form.control} render={({field}) => (
                            <Input className="w-full" type="date" {...field as unknown as InputProps}/>
                        )}/>
                    </div>
                </div>
                {/*endregion*/}

                <div className={'w-full md:col-span-2 flex-center-row mt-4'}>
                    <Button className="col-span-full md:col-span-1 px-12" type="submit">
                        Save Product
                    </Button>
                </div>
            </form>
        </Form>
    )
}
export default ProductForm
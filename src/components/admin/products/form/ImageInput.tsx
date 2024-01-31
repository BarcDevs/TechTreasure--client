import {v4 as uuid} from 'uuid'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {FormField, FormItem, FormMessage} from '@/components/ui/form.tsx'
import {useEffect, useRef} from 'react'
import {Color} from '@/types'
import {Control} from 'react-hook-form'
import {FormImage, ProductForm as ProductFormType} from '@/validations/productForm.ts'


type ImageInputProps = {
    images: FormImage[],
    setImages: React.Dispatch<React.SetStateAction<FormImage[]>>,
    type: 'main' | 'additional',
    colors: Color[],
    formControl: Control<ProductFormType>
}

const ImageInput = ({images, setImages, type, colors, formControl}: ImageInputProps) => {
    const ref = useRef<HTMLInputElement | null>(null)

    const addImage = () => {
        if (!ref.current) return
        if (!ref.current.files || ref.current.files.length === 0) return

        if (type === 'main' && !colors.length)
            setImages(() => [
                {image: ref.current!.files![0]}
            ])

        else
            setImages(prevState => [
                ...prevState,
                ...Object.values(ref.current!.files!)
                    .map(file => ({image: file}))
                // todo assign color
            ])

        ref.current!.value = ''
    }

    const removeImage = (image: FormImage) => {
        setImages(prevState =>
            prevState.filter(i => i !== image))
    }

    useEffect(() => {
        console.log(images)
    }, [images])

    return (
        <FormItem className="w-full">
            <label
                className="block text-sm font-medium text-gray-700">{type === 'main' ? 'Main Image' : 'Additional Images'}</label>
            <div className="relative">
                <Input ref={ref}
                       multiple={type === 'additional' || colors.length > 0}
                       className="mt-1 w-full"
                       type="file"/>
                <Button type={'button'}
                        onClick={() => addImage()}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        variant="outline">
                    Add
                </Button>
                <FormField name={type === 'main' ? 'mainImage' : 'images'} control={formControl} render={() => (
                    <FormMessage/>
                )}/>
            </div>

            <ul className="flex flex-wrap gap-2 mt-2">
                {images.map(image => (
                    <li key={uuid()}>
                        <img
                            className="aspect-square h-24 w-24 cursor-pointer object-contain hover:opacity-80"
                            height="100"
                            // @ts-ignore
                            src={URL.createObjectURL(image?.image ?? image)}
                            width="100"
                            alt={'image'}
                            onClick={() => removeImage(image)}/>
                    </li>
                ))}
            </ul>
        </FormItem>
    )
}

export default ImageInput

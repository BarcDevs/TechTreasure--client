import {v4 as uuid} from 'uuid'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {FormField, FormItem, FormMessage} from '@/components/ui/form.tsx'
import {useRef} from 'react'
import {Color} from '@/types'
import {Control} from 'react-hook-form'
import {ProductForm as ProductFormType} from '@/validations/productForm.ts'


type ImageInputProps = {
    images: ImageState[],
    setImages: React.Dispatch<React.SetStateAction<ImageState[]>>,
    type: 'main' | 'additional',
    colors: Color[],
    formControl: Control<ProductFormType>
}

export type ImageState = File | {
    image: File,
    color: string
}


const ImageInput = ({images, setImages, type, colors, formControl}: ImageInputProps) => {
    const ref = useRef<HTMLInputElement | null>(null)

    const addImage = () => {
        if (!ref.current) return
        if (!ref.current.files || ref.current.files.length === 0) return
        if (type === 'main' &&
            (colors.length > 0 &&
                (images.length + ref.current.files.length > colors.length) ||
                images.length + ref.current.files.length > 1)) return // todo display form error

        if (type === 'main' && !colors.length)
            setImages(prevState => [
                ...prevState,
                ref.current!.files![0]
            ])
        else
            setImages(prevState => [...prevState, ...ref.current!.files!])

        ref.current!.value = ''
    }

    const removeImage = (image: ImageState) => {
        setImages(prevState =>
            prevState.filter(i => i !== image))
    }

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
                    <li>
                        <img key={uuid()}
                             className="w-24 h-24 aspect-square object-contain cursor-pointer"
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

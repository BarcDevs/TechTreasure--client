import {imageUrl} from '@/lib/utils/url.ts'
import {Image} from '@/types'
import {FormImage} from '@/validations/productForm.ts'

export const getImageFile = async (url: string): Promise<File> => {
    const res = await fetch(imageUrl(url))
    const contentType = res.headers.get('content-type') || 'image/png'
    const blob = await res.blob()
    return new File([blob], 'file', {type: contentType})
}

export const getImagesFromProduct = async (images: Image[]): Promise<Awaited<(FormImage)>[]> => {
    return await Promise.all(images.map(async image =>
        ({image: await getImageFile(image.path), color: image.color})))
}

export const getImagesOfColor = (images: Image[], color: string, one?: boolean) => {
    return one ?
        [images.find(image => image.color === color)] :
        images.filter(image => image.color === color)
}


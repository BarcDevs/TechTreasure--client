import {CartItem} from '@/types'
import {getImagesOfColor} from '@/lib/utils/image.ts'
import {imageUrl} from '@/lib/utils/url.ts'
import {isProductWithColors} from '@/lib/utils/product.ts'

const CheckoutItem = ({item}: { item: CartItem }) => (
    <div className={'flex-row-between h-fit w-full items-center'}>
        <div className={'flex_row h-fit items-center gap-6'}>
            <div className={'flex-center h-[54px] w-[54px] '}>
                <img src={imageUrl(isProductWithColors(item) ? getImagesOfColor(item.mainImage, item.defaultColor, true)[0]?.path : item.mainImage[0].path)} alt={item.name}/>
            </div>
            <p>
                {item.name}
            </p>
        </div>
        <p>
            ${item.subtotal}
        </p>
    </div>
)


export default CheckoutItem

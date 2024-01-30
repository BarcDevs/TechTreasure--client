import {CartItem} from '@/types'
import {getImagesOfColor, imageUrl, isProductWithColors} from '@/lib/utils.ts'

const CheckoutItem = ({item}: { item: CartItem }) => (
    <div className={'flex-row-between h-fit w-full items-center'}>
        <div className={'flex_row h-fit gap-6 items-center'}>
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

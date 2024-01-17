import {CartItem} from '@/types'
import {isProductWithColors} from '@/lib/utils.ts'

const CheckoutItem = ({item}: { item: CartItem }) => (
    <div className={'flex-row-between h-fit w-full items-center'}>
        <div className={'flex_row h-fit gap-6 items-center'}>
            <div className={'flex-center h-[54px] w-[54px] '}>
                <img src={isProductWithColors(item) ? item.mainImage[item.defaultColor] : item.mainImage} alt={item.name}/>
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

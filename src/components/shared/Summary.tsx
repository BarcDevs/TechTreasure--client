import {Separator} from '@/components/ui/separator.tsx'

const Summary = ({subtotal, shipping, total, discount}: {
    subtotal: number,
    shipping: number,
    total: number,
    discount?: number
}) => (
    <div className={'flex_col text-body w-full gap-4'}>
        <div className={'flex-row-between w-full'}>
            <p>Subtotal:</p>
            <p>${subtotal}</p>
        </div>
        {discount ?
            <>
                <Separator className={'h-[0.5px] bg-black'}/>
                <div className={'flex-row-between w-full text-green-700'}>
                    <p>Discount:</p>
                    <p>$-{discount}</p>
                </div>
            </> : undefined
        }
        <Separator className={'h-[0.5px] bg-black'}/>
        <div className={'flex-row-between w-full'}>
            <p>Shipping:</p>
            <p>{shipping === 0 ? 'Free' : `$${shipping}`}</p>
        </div>
        <Separator className={'h-[0.5px] bg-black'}/>
        <div className={'flex-row-between w-full font-bold'}>
            <p>Total:</p>
            <p>${total}</p>
        </div>
    </div>
)


export default Summary

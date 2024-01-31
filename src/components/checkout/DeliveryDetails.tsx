import {ClassName} from '@/types'
import {twMerge} from 'tailwind-merge'
import {Separator} from '@/components/ui/separator.tsx'
import {Link} from 'react-router-dom'
import Icon from '@/components/elements/Icon.tsx'

const DeliveryDetails = ({price, className}: { price: number, className?: ClassName }) => (
    <div className={twMerge('w-full flex-col-start rounded border border-black border-opacity-50', className)}>
        <div className="flex-row-start items-center gap-4 p-4 pt-6">
            <div className={'flex-center h-full'}>
                <Icon path={'/assets/icons/delivery.svg'} name={'truck'} size={40}/>
            </div>
            <div className="flex-col-start inline-flex gap-2">
                <p className="text-body-semibold text-black">
                    {price > 0 ?
                        'Shipping: ' :
                        'Free Shipping'}
                    {price > 0 && <span className={'text-red-500'}>${price.toFixed(2)}</span>}
                </p>
                <Link to={'?delivery-policy=true'}>
                    <p className="text-tiny text-black underline">
                        Enter your postal code for Delivery Availability
                    </p>
                </Link>
            </div>
        </div>
        <Separator className={'h-[0.5px] bg-black opacity-50'}/>
        <div className="flex-row-start items-center gap-4 p-4 pb-6">
            <div className={'flex-center h-full'}>
                <Icon path={'/assets/icons/return.svg'} name={'return'} size={40}/>
            </div>
            <div className="flex-col-start inline-flex gap-2">
                <p className="text-body-semibold text-black">Return Delivery</p>
                <p className={'text-tiny text-black'}>
                    Free 30 Days Delivery Returns. <span className="underline">
                    <Link to={'?return-policy=true'}>Details</Link>
                </span>
                </p>
            </div>
        </div>
    </div>
)


export default DeliveryDetails

import Icon from '@/components/elements/Icon.tsx'
import {Input} from '@/components/ui/input.tsx'

type QuantitySelectorProps = {
    quantity: number
    setQuantity: React.Dispatch<React.SetStateAction<number>>
    max: number
}

const QuantitySelector = ({quantity, setQuantity, max}: QuantitySelectorProps) => {
    const increment = () => {
        if (quantity < max) {
            setQuantity(q => q + 1)
        }
    }

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(q => q - 1)
        }
    }

    const update = (value: number) => {
        if (value > max) {
            setQuantity(() => max)
        } else if (value < 1) {
            setQuantity(() => 1)
        } else {
            setQuantity(() => value)
        }
    }

    return (
        <div className={'h-max flex_row'}>
            <button
                className={'flex-center bg-red-500 rounded-l border border-red-500 px-2 py-2.5 hover:opacity-90 disabled:opacity-80 disabled:cursor-not-allowed'}
                disabled={max <= 0}
                onClick={decrement}>
                <Icon path={'/assets/icons/minus.svg'} name={'-'} size={24}
                      className={'invert'}/>
            </button>
            <Input type={'number'}
                   disabled={max <= 0}
                   value={quantity}
                   min={1}
                   max={max}
                   onChange={(e) => update(Number(e.target.value))}
                   className={'w-16 h-full text-center rounded-none border-x-0 border-black hide-arrows text-heading-semibold no-focus'}/>
            <button
                className={'flex-center bg-red-500 rounded-r border border-red-500 px-2 py-2.5 hover:opacity-90 disabled:opacity-80 disabled:cursor-not-allowed'}
                disabled={max <= 0}
                onClick={increment}>
                <Icon path={'/assets/icons/plus.svg'} name={'+'} size={24} className={'invert'}/>
            </button>
        </div>
    )
}

export default QuantitySelector

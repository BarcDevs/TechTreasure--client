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
        <div className={'flex_row h-max'}>
            <button
                className={'flex-center rounded-l border border-red-500 bg-red-500 px-2 py-2.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-80'}
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
                   className={'hide-arrows text-heading-semibold no-focus h-full w-16 rounded-none border-x-0 border-black text-center'}/>
            <button
                className={'flex-center rounded-r border border-red-500 bg-red-500 px-2 py-2.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-80'}
                disabled={max <= 0}
                onClick={increment}>
                <Icon path={'/assets/icons/plus.svg'} name={'+'} size={24} className={'invert'}/>
            </button>
        </div>
    )
}

export default QuantitySelector

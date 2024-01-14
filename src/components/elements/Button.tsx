import {ButtonHTMLAttributes, HTMLProps} from 'react'
import {twMerge} from 'tailwind-merge'

type ButtonProps = {
    text: string
    variant?: 'red' | 'white'
    className?: HTMLProps<HTMLElement>["className"]
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({text, variant = 'red', className, ...props}: ButtonProps) => {
    const variantStyle = variant === 'red' ? 'bg-red-500 text-neutral-50' : 'border border-black bg-neutral-50 text-black'
    return (
        <button
            className={twMerge('text-body-medium w-fit rounded px-12 py-3 hover:opacity-90', variantStyle, className)}
            {...props}>
            <p>
                {text}
            </p>
        </button>
    )
}

export default Button

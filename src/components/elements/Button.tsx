import {ButtonHTMLAttributes, HTMLProps} from 'react'
import {twMerge} from 'tailwind-merge'

type ButtonProps = {
    text: string
    className?: HTMLProps<HTMLElement>["className"]
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({text, className, ...props}: ButtonProps) => {
    return (
        <button className={twMerge('text-body-medium w-fit rounded bg-red-500 px-12 py-3 text-neutral-50 hover:opacity-90', className)}
                {...props}>
            <p>
                {text}
            </p>
        </button>
    )
}

export default Button

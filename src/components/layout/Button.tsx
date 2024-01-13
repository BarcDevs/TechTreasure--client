import {MouseEventHandler} from 'react'

const Button = ({text, onClick} : { text: string , onClick?: MouseEventHandler<HTMLButtonElement>}) => {
    return (
        <button className={'w-fit rounded bg-red-500 px-12 py-3 hover:opacity-90'} onClick={onClick}>
            <p className={'text-body-medium text-neutral-50'}>
                {text}
            </p>
        </button>
    )
}

export default Button

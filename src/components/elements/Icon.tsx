import {twMerge} from 'tailwind-merge'

type Props = {
    path: string,
    name: string,
    size?: number,
    className?: string
    hoverable?: boolean
}

const Icon = ({path, name, size = 20, className, hoverable}: Props) =>
    hoverable ?
        <div className={twMerge(`flex-center group rounded-full hover:bg-red-500`)}
             style={{height: size + 3, width: size + 3}}>
            <img src={path} alt={name} width={size} height={size}
                 className={twMerge('group-hover:invert', className)}/>
        </div> :
        <img src={path} alt={name} className={className}/>


export default Icon

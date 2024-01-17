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
        <div className={twMerge(`flex-center group/icon rounded-full hover:bg-red-500`)}
             style={{height: size + 5, width: size + 5}}>
            <img src={path} alt={name} width={size} height={size}
                 className={twMerge('group-hover/icon:invert', className)}/>
        </div> :
        <img src={path} alt={name} className={className}  width={size} height={size}/>


export default Icon

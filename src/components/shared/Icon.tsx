type Props = {
    path: string,
    name: string,
    size?: number,
    className?: string
}

const Icon = ({path, name, size = 20, className}: Props) => (
    <img src={path} alt={name} width={size} height={size} className={className}/>
)

export default Icon

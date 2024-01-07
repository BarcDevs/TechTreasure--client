const Icon = ({path, name, size = 20} : {path: string, name: string, size?: number}) => (
    <img src={path} alt={name} width={size} height={size}/>
)

export default Icon

import {ClassName} from '@/types'

const RequiredInput = ({children, className}: { children: React.ReactNode , className?: ClassName}) => (
    <div className={`relative ${className}`}>
        {children}
        <span className="absolute inset-y-2 right-2 flex items-start text-red-500">*</span>
    </div>
)

export default RequiredInput

import {ReactNode} from 'react'

const TermContent = ({children}: { children: ReactNode }) =>
    (
        <p className="text-gray-600">
            {children}
        </p>

    )

export default TermContent

import {ReactNode} from 'react'

const TermHeadline = ({children}: { children: ReactNode }) =>
    (
        <h2 className="mt-4 text-xl font-semibold text-gray-800">
            {children}
        </h2>
    )

export default TermHeadline

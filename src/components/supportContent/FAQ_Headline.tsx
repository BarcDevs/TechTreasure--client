import {ReactNode} from 'react'

const FAQ_Headline = ({children}: { children: ReactNode }) =>
    (
        <h2 className="mb-3 text-xl font-semibold text-gray-800">
            {children}
        </h2>
    )

export default FAQ_Headline

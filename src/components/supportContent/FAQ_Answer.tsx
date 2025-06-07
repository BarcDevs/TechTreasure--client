import {ReactNode} from 'react'

const FAQ_Answer = ({children}: { children: ReactNode }) =>
    (
        <p className="mt-2 text-gray-600">
            {children}
        </p>
    )

export default FAQ_Answer

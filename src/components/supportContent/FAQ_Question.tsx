import {ReactNode} from 'react'

const FAQ_Question = ({children}: { children: ReactNode }) =>
    (
        <summary className="cursor-pointer font-medium">
            {children}
        </summary>
    )

export default FAQ_Question

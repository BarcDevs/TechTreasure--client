import {ReactNode} from 'react'

const PrivacyBody = ({children}: {children: ReactNode}) =>
    (
        <p className="text-gray-600">
            {children}
        </p>
    )

export default PrivacyBody

import {BaseUser} from '@/types'
import {FC} from 'react'

type Props = {
    user: BaseUser
}

const UserDetails: FC<Props> = ({user}) =>
    (
        <main className="container mx-auto flex-1 px-4 py-8">
            <div className="w-full">
                <div className="rounded-md border border-gray-200 p-6">
                    <div className="gap-x-8 gap-y-6">
                        <div className="flex flex-col gap-6">
                            <div>
                                <h3 className="mb-2 text-sm font-medium text-gray-700">
                                    Full Name
                                </h3>
                                <div className="rounded-md bg-gray-100 p-3 text-sm text-gray-800">
                                    {user?.name}
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-2 text-sm font-medium text-gray-700">
                                    Email
                                </h3>
                                <div className="rounded-md bg-gray-100 p-3 text-sm text-gray-800">
                                    {user?.email}
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-2 text-sm font-medium text-gray-700">
                                    Address
                                </h3>
                                <div className="rounded-md bg-gray-100 p-3 text-sm text-gray-800">
                                    {user?.address || 'N/A'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )

export default UserDetails

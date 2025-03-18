import {useLocation} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {useRef, useState} from 'react'
import {IRootState} from '@/store'
import MyProfileForm from '@/components/profile/MyProfileForm.tsx'
import Button from '@/components/elements/Button.tsx'
import Icon from '@/components/elements/Icon.tsx'
import UserDetails from '@/components/profile/UserDetails.tsx'
import {ProfileForm} from '@/validations/ProfileForm.tsx'
import {FormRef} from '@/types/ui'

export default function AccountPage() {
    const pathname = useLocation().pathname
    const formRef = useRef<FormRef | null>(null)
    // todo: add option to get another user details on seller mode
    const user =
        useSelector((state: IRootState) => state.auth.user)

    const [edit, setEdit] = useState(false)

    const onSubmit = (data: ProfileForm) => {
        console.log(data)
        // todo: Handle form submission logic here
    }

    return (
        <div className="min-h-screen bg-white">
            <main className="container mx-auto px-4 py-8">
                <div className="flex gap-8">
                    <div className="flex-1">
                        <div className="flex_col mb-8 items-center justify-between">
                            <div className={'flex_row w-full items-baseline justify-between'}>
                                <h1 className="text-2xl font-medium text-red-500">
                                    {pathname === '/account/me' ? 'Your Profile' : `${/*user.name*/ +' '} Profile`}
                                </h1>
                                <div className="text-sm">
                                    Welcome!
                                    <span className="text-red-500">
                                        &nbsp;{user?.name}
                                    </span>
                                </div>
                                {pathname === '/account/me' &&
                                    <Button
                                        onClick={() => setEdit(prevState => !prevState)}
                                    >
                                        <Icon
                                            name={edit ? 'save' : 'edit'}
                                            path={`/assets/icons/${edit ? 'save' : 'edit'}.svg`}
                                            size={20}
                                            hoverable
                                        />
                                    </Button>
                                }
                            </div>
                            {!edit && user ?
                                <UserDetails user={user}/> :
                                edit && pathname === '/account/me' ?
                                    <MyProfileForm
                                        ref={formRef}
                                        onSubmit={onSubmit}
                                        user={user!}
                                    /> :
                                <p className={'text-red-500'}>User not found</p>
                            }
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

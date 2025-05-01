import {Button} from '@/components/ui/button.tsx'
import {BaseUser} from '@/types'
import {FieldPath, useForm} from 'react-hook-form'
import {Form} from '@/components/ui/form.tsx'
import {ProfileForm, profileFormSchema} from '@/validations/profileForm.ts'
import {zodResolver} from '@hookform/resolvers/zod'
import FormInput from '@/components/shared/FormInput.tsx'

type ProfileFormProps = {
    user: BaseUser
    setEdit: (edit: boolean) => void
}

const MyProfileForm =
    ({user, setEdit}: ProfileFormProps) => {
        const form = useForm<ProfileForm>({
            resolver: zodResolver(profileFormSchema),
            defaultValues: {
                name: user.name,
                email: user.email || '',
                address: user.address || '',
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }
        })
        const {dirtyFields} = form.formState

        const handleFormBlur = () => {
            Object.keys(dirtyFields).forEach((key) => {
                form.trigger(key as (FieldPath<ProfileForm>))
            })
        }

        const submitForm = (data: ProfileForm) => {
            console.log(data)
            // todo: Handle form submission logic here
        }

        return (
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(submitForm)}
                    onBlur={handleFormBlur}
                    className="space-y-6"
                >
                    <FormInput
                        className={'rounded-none border-x-0 border-t-0 border-black'}
                        key={'name'}
                        name={'name'}
                        label={'Name'}
                        formControl={form.control}
                        required={true}
                    />
                    <FormInput
                        className={'rounded-none border-x-0 border-t-0 border-black'}
                        key={'email'}
                        name={'email'}
                        label={'Email'}
                        formControl={form.control}
                        required={true}
                    />
                    <FormInput
                        className={'rounded-none border-x-0 border-t-0 border-black'}
                        key={'address'}
                        name={'address'}
                        label={'Address'}
                        formControl={form.control}
                        required={true}
                    />

                    {/*<div>*/}
                    {/*    <h2 className="mb-4 text-lg font-medium">*/}
                    {/*        Password Changes*/}
                    {/*    </h2>*/}
                    {/*    <div className="space-y-4">*/}
                    {/*        <div>*/}
                    {/*            <FormInput*/}
                    {/*                className={'rounded-none border-x-0 border-t-0 border-black'}*/}
                    {/*                key={'oldPassword'}*/}
                    {/*                name={'currentPassword'}*/}
                    {/*                placeholder={'Current Password'}*/}
                    {/*                formControl={form.control}*/}
                    {/*                type="password"*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*        <div>*/}
                    {/*            <FormInput*/}
                    {/*                className={'rounded-none border-x-0 border-t-0 border-black'}*/}
                    {/*                key={'newPassword'}*/}
                    {/*                name={'newPassword'}*/}
                    {/*                placeholder={'New Password'}*/}
                    {/*                formControl={form.control}*/}
                    {/*                type="password"*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*        <div>*/}
                    {/*            <FormInput*/}
                    {/*                className={'rounded-none border-x-0 border-t-0 border-black'}*/}
                    {/*                key={'confirmPassword'}*/}
                    {/*                name={'confirmPassword'}*/}
                    {/*                placeholder={'Confirm Password'}*/}
                    {/*                formControl={form.control}*/}
                    {/*                type="password"*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <div className="mt-4 flex justify-end gap-4">
                        <Button type="button"
                                onClick={() => setEdit(false)}
                                variant="outline"
                        >
                            Cancel
                        </Button>
                        <Button type="submit"
                                className="bg-red-500 hover:bg-red-600">
                            Save Changes
                        </Button>
                    </div>
                </form>
            </Form>
        )
    }

export default MyProfileForm

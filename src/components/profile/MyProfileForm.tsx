import {Button} from '@/components/ui/button.tsx'
import {ForwardedRef, forwardRef, useImperativeHandle} from 'react'
import {ProfileForm} from '@/validations/ProfileForm'
import {BaseUser} from '@/types'
import {FieldPath, Form, useForm} from 'react-hook-form'
import {profileFormSchema} from '@/validations/ProfileForm.tsx'
import {zodResolver} from '@hookform/resolvers/zod'
import FormInput from '@/components/shared/FormInput.tsx'
import {FormRef} from '@/types/ui'

type ProfileFormProps = {
    user: BaseUser
    onSubmit: (data: ProfileForm) => void
}

const MyProfileForm = forwardRef(
    ({onSubmit, user}: ProfileFormProps, formRef: ForwardedRef<FormRef | null>) => {
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
        // @ts-ignore
        useImperativeHandle(formRef, () => ({
            submit: () => {
                form.handleSubmit(onSubmit)()
            }
        }))

        const handleFormBlur = () => {
            Object.keys(dirtyFields).forEach((key) => {
                form.trigger(key as (FieldPath<ProfileForm>))
            })
        }

        return (
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    ref={formRef}
                    onBlur={handleFormBlur}
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
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*        <div>*/}
                    {/*            <FormInput*/}
                    {/*                className={'rounded-none border-x-0 border-t-0 border-black'}*/}
                    {/*                key={'newPassword'}*/}
                    {/*                name={'newPassword'}*/}
                    {/*                placeholder={'New Password'}*/}
                    {/*                formControl={form.control}*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*        <div>*/}
                    {/*            <FormInput*/}
                    {/*                className={'rounded-none border-x-0 border-t-0 border-black'}*/}
                    {/*                key={'confirmPassword'}*/}
                    {/*                name={'confirmPassword'}*/}
                    {/*                placeholder={'Confirm Password'}*/}
                    {/*                formControl={form.control}*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline">
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-red-500 hover:bg-red-600">
                            Save Changes
                        </Button>
                    </div>
                </form>
            </Form>
        )
    })

export default MyProfileForm

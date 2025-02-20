import {Form} from '@/components/ui/form.tsx'
import {FieldPath, useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {CheckoutForm as CheckoutFormType, checkoutFormSchema} from '@/validations/checkoutForm.ts'
import FormInput from '@/components/shared/FormInput.tsx'
import {Input} from '@/components/ui/input.tsx'
import {ForwardedRef, forwardRef, useImperativeHandle} from 'react'
import {FormRef} from '@/types/ui'
import {CHECKOUT_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'
import {useTranslation} from 'react-i18next'

type CheckoutFormProps = {
    saveDetails: boolean
    setSaveDetails: (saveDetails: boolean) => void
}

const FIELDS = [
    {name: 'name', label: CHECKOUT_LOCALES.name, required: true},
    {name: 'company', label: CHECKOUT_LOCALES.company},
    {name: 'address', label: CHECKOUT_LOCALES.address, required: true},
    {name: 'additional_address', label: CHECKOUT_LOCALES.additionalAddress},
    {name: 'city', label: CHECKOUT_LOCALES.city, required: true},
    {name: 'country', label: CHECKOUT_LOCALES.country, required: true},
    {name: 'postcode', label: CHECKOUT_LOCALES.postcode, required: true},
    {name: 'phone', label: CHECKOUT_LOCALES.phone, required: true},
    {name: 'email', label: CHECKOUT_LOCALES.email, required: true}
]

const CheckoutForm = forwardRef(({saveDetails, setSaveDetails}: CheckoutFormProps, ref: ForwardedRef<FormRef | null>) => {
    const {t} = useTranslation(I18N_NAMESPACES.checkout)

    const form = useForm<CheckoutFormType>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            name: '',
            company: '',
            address: '',
            additional_address: '',
            city: '',
            country: '',
            postcode: '',
            phone: '',
            email: ''
        }
    })
    const {dirtyFields} = form.formState

    useImperativeHandle(ref, () => ({
        submit: () => {
            form.trigger()
            if (form.formState.isValid)
                return form.getValues()
            return undefined
        }
    }))

    const handleFormBlur = () => {
        Object.keys(dirtyFields).forEach((key) => {
            form.trigger(key as (FieldPath<CheckoutFormType>))
        })
    }

    return (
        <Form {...form}>
            {/* TODO: add saved addresses */}
            <form onBlur={handleFormBlur} className={'flex_col w-full gap-2 max-lg:pr-5'}>
                {FIELDS.map((field) => (
                    <FormInput
                        className={'rounded-none border-x-0 border-t-0 border-black'}
                        key={field.name}
                        name={field.name as FieldPath<CheckoutFormType>}
                        label={t(field.label)}
                        formControl={form.control}
                        required={field.required}
                    />
                ))}
            <div className={'flex-row-start mt-4 gap-4'}>
                <Input className={'size-6 rounded accent-red-500'} type={'checkbox'} checked={saveDetails}
                       onChange={() => setSaveDetails(!saveDetails)}/>
                <p className={'text-body'}>{t(CHECKOUT_LOCALES.saveDetails)}</p>
            </div>
            </form>
        </Form>
    )
})

export default CheckoutForm

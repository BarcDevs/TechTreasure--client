import {Form} from '@/components/ui/form.tsx'
import {FieldPath, useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {CheckoutForm as CheckoutFormType, checkoutFormSchema} from '@/validations/checkoutForm.ts'
import FormInput from '@/components/shared/FormInput.tsx'

type CheckoutFormProps = {
    setUserInformation: (userInformation: CheckoutFormType) => void
    saveDetails: boolean
    setSaveDetails: (saveDetails: boolean) => void
}

const CheckoutForm = ({setUserInformation, saveDetails, setSaveDetails}: CheckoutFormProps) => {
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
    const { dirtyFields} = form.formState

    const onSave = (values: CheckoutFormType) => {
        console.log(values)
        setUserInformation(values)
    }

    const handleFormBlur = () => {
        Object.keys(dirtyFields).forEach((key) => {
            form.trigger(key as (FieldPath<CheckoutFormType>))
        })
    }

    return (
        <Form {...form}>
            <form onBlur={handleFormBlur} className={'w-[30vw]'}>
                <FormInput name={'name'} label={'Name'} formControl={form.control} required/>
                <FormInput name={'company'} label={'Company Name'} formControl={form.control}/>
                <FormInput name={'address'} label={'Address'} formControl={form.control} required/>
                <FormInput name={'additional_address'} label={'Apartment, floor, etc. (optional)'} formControl={form.control}/>
                <FormInput name={'city'} label={'City'} formControl={form.control} required/>
                <FormInput name={'country'} label={'Country'} formControl={form.control} required/>
                <FormInput name={'postcode'} label={'ZIP Code'} formControl={form.control} required/>
                <FormInput name={'phone'} label={'Phone Number'} formControl={form.control} required/>
                <FormInput name={'email'} label={'Email Address'} formControl={form.control} required/>
            </form>
        </Form>
    )
}

export default CheckoutForm

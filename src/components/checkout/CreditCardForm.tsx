import {useForm} from 'react-hook-form'
import {CreditCardForm as CreditCardFormType, creditCardFormSchema} from '@/validations/checkoutForm.ts'
import {zodResolver} from '@hookform/resolvers/zod'
import {Form, FormField, FormItem, FormMessage} from '@/components/ui/form.tsx'
import FormInput from '@/components/shared/FormInput.tsx'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select.tsx'
import {ForwardedRef, forwardRef, useImperativeHandle, useRef} from 'react'
import {FormRef} from '@/types/ui'

type Props = {
    onSubmit: (cardDetails: CreditCardFormType) => void
}

const MONTHS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
const YEARS = ['2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035']

const CreditCardForm = forwardRef(
    ({onSubmit}: Props, ref: ForwardedRef<FormRef | null>) => {
        const form = useForm<CreditCardFormType>({
            resolver: zodResolver(creditCardFormSchema),
            defaultValues: {
                card_number: '',
                cvc: '',
                expiry_month: '',
                expiry_year: ''
            }
        })
        const formRef = useRef<HTMLFormElement | null>(null)
        useImperativeHandle(ref, () => ({
            submit: () => {
                form.handleSubmit(onSubmit)()
            }
        }))

        return (
            <Form {...form}>
                <form ref={formRef} onSubmit={() => form.handleSubmit(onSubmit)} className={'flex_col gap-2'}>
                    <FormInput name={'card_number'} type={'number'} className={'hide-arrows'}
                               placeholder={'Card Number'}
                               formControl={form.control}/>
                    <div className={'flex_row w-full gap-4'}>
                        <FormField name={'expiry_month'}
                                   control={form.control}
                                   render={({field}) =>
                                       (
                                           <FormItem>
                                               <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                   {/* todo add placeholder opacity */}
                                                   <SelectTrigger aria-label="Month" id="month">
                                                       <SelectValue placeholder="Month"/>
                                                   </SelectTrigger>
                                                   <SelectContent>
                                                       {MONTHS.map((month) => (
                                                           <SelectItem key={month} value={month}>
                                                               {month}
                                                           </SelectItem>
                                                       ))}
                                                   </SelectContent>
                                               </Select>
                                               <FormMessage/>
                                           </FormItem>
                                       )}
                        />
                        <FormField name={'expiry_year'}
                                   control={form.control}
                                   render={({field}) =>
                                       (
                                           <FormItem>
                                               <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                   {/* todo add placeholder opacity */}
                                                   <SelectTrigger aria-label="Year" id="year">
                                                       <SelectValue placeholder="Year"/>
                                                   </SelectTrigger>

                                                   <SelectContent>
                                                       {YEARS.map((year) => (
                                                           <SelectItem key={year} value={year}>
                                                               {year}
                                                           </SelectItem>
                                                       ))}
                                                   </SelectContent>
                                               </Select>
                                               <FormMessage/>
                                           </FormItem>
                                       )}
                        />
                        <FormInput name={'cvc'} type={'number'} className={'hide-arrows'} placeholder={'CVC'}
                                   formControl={form.control}/>
                    </div>
                </form>
            </Form>
        )
    })

export default CreditCardForm

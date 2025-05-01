import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form.tsx'
import {Input, InputProps} from '@/components/ui/input.tsx'
import {Control, FieldValues, Path} from 'react-hook-form'
import {twMerge} from 'tailwind-merge'

type FormInputProps<T extends FieldValues> = {
    name: Path<T>
    placeholder?: string
    label?: string
    type?: InputProps['type']
    className?: string
    required?: boolean
    hideError?: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formControl: Control<T & FieldValues, any>
} & InputProps

const FormInput = <T extends FieldValues, >({
                                                name,
                                                label,
                                                placeholder,
                                                className,
                                                formControl,
                                                type,
                                                required,
                                                hideError = false,
                                                ...props
                                            }: FormInputProps<T>) => {
    return (
        <FormField
            control={formControl}
            name={name}
            render={({field}) =>
                (
                    <FormItem>
                        {label &&
                            <FormLabel htmlFor={field.name} className={'text-body opacity-50'}>
                                {label}
                                {required && <span className={'text-red-500'}>*</span>}
                            </FormLabel>}
                        <FormControl>
                            <Input placeholder={placeholder}
                                   type={type ?? 'text'}
                                   className={twMerge('no-focus text-body placeholder:opacity-40', className)}
                                   {...props}
                                   {...field} />
                        </FormControl>
                        {!hideError && <FormMessage/>}
                    </FormItem>
                )}
        />
    )
}

export default FormInput

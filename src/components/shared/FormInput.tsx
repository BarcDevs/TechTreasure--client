import {FormControl, FormField, FormItem, FormMessage} from '@/components/ui/form.tsx'
import {Input, InputProps} from '@/components/ui/input.tsx'
import {Control, FieldValues, Path} from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

type FormInputProps<T extends FieldValues> = {
    name: Path<T>
    placeholder: string
    type?: InputProps['type']
    className?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formControl: Control<T & FieldValues, any>
}

const FormInput = <T extends FieldValues,>({name, placeholder, className, formControl, type}: FormInputProps<T>) => {
    return (
        <FormField
            control={formControl}
            name={name}
            render={({field}) => (
                <FormItem>
                    <FormControl>
                        <Input placeholder={placeholder}
                               type={type ?? 'text'}
                               className={twMerge('no-focus text-body placeholder:opacity-40', className)}
                               {...field} />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
    )
}

export default FormInput

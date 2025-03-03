import {FC} from 'react'
import {UseFormRegister} from 'react-hook-form'
import {ContactForm as ContactFormType} from '@/validations/contactForm.ts'
import {Input} from '@/components/ui/input.tsx'

type InputProps = {
    name: 'name' | 'email' | 'phone' | 'message',
    error: string | undefined,
    register: UseFormRegister<ContactFormType>,
    placeholder: string
}

const FormInput: FC<InputProps> = ({name, error, register, placeholder}) =>
    (
        <div>
            <Input
                {...register(name)}
                placeholder={placeholder}
            />
            {error &&
                <p className="text-sm text-red-500">
                    {error}
                </p>}
        </div>
    )

export default FormInput

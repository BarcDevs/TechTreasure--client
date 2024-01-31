import {FormField, FormItem, FormMessage} from '@/components/ui/form.tsx'
import {Input} from '@/components/ui/input.tsx'
import {Badge} from '@/components/ui/badge.tsx'
import {memo, useRef} from 'react'
import {Control} from 'react-hook-form'
import {ProductForm as ProductFormType} from '@/validations/productForm.ts'


type ColorInputProps = {
    sizes: string[]
    setSizes: React.Dispatch<React.SetStateAction<string[]>>
    formControl: Control<ProductFormType, any>
}

const ColorInput = memo(({sizes, setSizes, formControl}: ColorInputProps) => {
    const sizeInputRef = useRef<HTMLInputElement | null>(null)

    const addSize = () => {
        if (!sizeInputRef.current) return
        if (sizeInputRef.current?.value === '') return
        if (sizes.find(size => size === sizeInputRef.current?.value)) return

        setSizes(prevState => [...prevState, sizeInputRef.current!.value.toUpperCase()])

        sizeInputRef.current.value = ''
    }

    const removeSize = (size: string) => {
        setSizes(prevState =>
            prevState.filter(s => s !== size))
    }

    return (
    <FormItem className="w-full">
        <FormField name={'sizes'}
                   control={formControl}
                   render={() => (
                       <>
                           <Input ref={sizeInputRef}
                                  className="w-full"
                                  placeholder="Sizes (optional)"
                                  type="text"
                                  onKeyDown={key =>
                                      key.key === 'Enter' && addSize()}/>
                           <FormMessage/>
                       </>
                   )}/>
        <div
            className="mt-2 flex flex-wrap gap-2">
            {sizes.map(size => (
                <Badge key={size}
                       className="cursor-pointer px-2 py-1"
                       onClick={() => removeSize(size)}>
                    {size}
                </Badge>
            ))}
        </div>
    </FormItem>

)
})

export default ColorInput

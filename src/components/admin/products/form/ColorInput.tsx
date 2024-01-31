import {FormField, FormItem, FormMessage} from '@/components/ui/form.tsx'
import {Input} from '@/components/ui/input.tsx'
import {Button} from '@/components/ui/button.tsx'
import {Badge} from '@/components/ui/badge.tsx'
import {memo, useRef} from 'react'
import {Color} from '@/types'
import {getContrastColor} from '@/lib/utils/color.ts'
import {Control} from 'react-hook-form'
import {ProductForm as ProductFormType} from '@/validations/productForm.ts'


type ColorInputProps = {
    colors: Color[]
    setColors: React.Dispatch<React.SetStateAction<Color[]>>
    formControl: Control<ProductFormType, any>
}

const ColorInput = memo(({colors, setColors, formControl}: ColorInputProps) => {
    const colorNameRef = useRef<HTMLInputElement | null>(null)
    const colorHexRef = useRef<HTMLInputElement | null>(null)

    const addColor = () => {
        if (!colorNameRef.current || !colorHexRef.current) return
        if (colorNameRef.current.value === '') return
        if (colors.find(color => color.hex === colorHexRef.current?.value)) return

        setColors(prevState => [
            ...prevState,
            {
                name: colorNameRef.current!.value,
                hex: colorHexRef.current!.value
            }])

        colorNameRef.current.value = ''
        colorHexRef.current.value = '#000000'
    }

    const removeColor = (color: Color) => {
        setColors(prevState =>
            prevState.filter(c => c.hex !== color.hex))
    }


    return (
        <FormItem className="flex_col w-full">
            <div
                className={'flex_row w-full'}>
                <div
                    className={'flex-row-start w-5/6 rounded focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'}>
                    <Input ref={colorNameRef}
                           name={'name'}
                           className="no-focus w-4/5 rounded-r-none"
                           placeholder="Add Color"
                           type="text"
                           onKeyDown={key =>
                               key.key === 'Enter' && addColor()}/>
                    <Input ref={colorHexRef}
                           name={'hex'}
                           className="no-focus w-1/5 rounded-l-none"
                           type="color"/>
                </div>
                <FormField name={'colors'}
                           control={formControl}
                           render={() => (
                               <FormMessage/>
                           )}/>
                <Button className="ml-2 w-1/6"
                        type={'button'}
                        onClick={addColor}>
                    Add
                </Button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
                {colors.map(color => (
                    <Badge
                        key={color.hex}
                        className="cursor-pointer px-2 py-1"
                        style={{
                            backgroundColor: color.hex,
                            color: getContrastColor(color.hex)
                        }}
                        onClick={() => removeColor(color)}>
                        {color.name}
                    </Badge>
                ))}
            </div>
        </FormItem>
    )
})

export default ColorInput

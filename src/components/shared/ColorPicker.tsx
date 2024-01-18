import {Color} from '@/types'
import {Dispatch, SetStateAction} from 'react'
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group.tsx'

type ColorPickerProps = {
    colors: Color[]
    color: string | null
    setColor: Dispatch<SetStateAction<string | null>>
}

const ColorPicker = ({colors, color, setColor}: ColorPickerProps) => {
    const activeColor = (colors.find(c => c.name === color))?.hex || '#000000'
    const handleColorChange = (value: string) => {
        setColor(() => value)
    }

    return (
        <RadioGroup className={'flex_row flex-start-center gap-2'} defaultValue={'creditCard'}
                    onValueChange={handleColorChange}>
            {colors.map(color => (
                <RadioGroupItem key={color.name}
                                value={color.name}
                                className={'border-2'}
                                style={{
                                    color: color.hex,
                                    borderColor: color.hex === activeColor ? '#000000' : color.hex,
                                    backgroundColor: color.hex
                                }}/>
            ))}
        </RadioGroup>
    )
}


export default ColorPicker

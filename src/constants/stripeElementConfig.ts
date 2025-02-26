import {Appearance} from '@stripe/stripe-js'

export const stripeAppearance: Appearance = {
    theme: 'flat',
    variables: {
        colorPrimary: '#333',
        colorBackground: '#f7f7f7',
        colorText: '#333',
        colorDanger: '#ff6f61',
        spacingUnit: '2px',
        borderRadius: '8px',
        fontFamily: 'YourFontFamily, sans-serif',
        fontSizeBase: '16px'
    },
    rules: {
        '.Input': {
            borderColor: '#ccc',
            padding: '12px 15px',
            marginBottom: '15px'
        },
        '.Input:focus': {
            borderColor: '#0056b3',
            boxShadow: '0 0 3px #0056b3'
        },
        '.Placeholder': {
            color: '#aaa',
            fontStyle: 'italic'
        }
    }
}

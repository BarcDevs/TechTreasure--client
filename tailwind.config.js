/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}'
    ],
    prefix: '',
    theme: {
        colors: {
            grayscale: {
                'title-active': '#14142B',
                body: '#4E4B66',
                label: '#6E7191',
                placeholder: '#A0A3BD',
                line: '#D9DBE9',
                'input-bg': '#EFF0F6',
                background: '#F7F7FC',
                'off-white': '#FCFCFC'
            },
            primary: {
                DEFAULT: '#5F2EEA',
                dark: '#2A00A2',
                light: '#BCA4FF',
                gradient: {
                    DEFAULT: ['#7433ff', '#ffa3fd'],
                }
            },
            secondary: {
                DEFAULT: '#1CC8EE',
                dark: '#0096B7',
                light: '#82E9FF',
                gradient: {
                    DEFAULT: ['#624af2', '#50ddc3']
                }
            },
            accent: {
                gradient: {
                    DEFAULT: ['#eb0055', '#fffa80']
                }
            },
            error: {
                DEFAULT: '#ED2E7E',
                dark: '#C30052',
                light: '#FF84B7'
            },
            success: {
                DEFAULT: '#00BA88',
                dark: '#00966D',
                light: '#34EAB9'
            },
            warning: {
                DEFAULT: '#F4B740',
                dark: '#946200',
                light: '#FFD789 '
            },
            // success: {
            //     50: '#ecfdf5',
            //     100: '#d1fae5',
            //     200: '#a7f3d0',
            //     300: '#6ee7b7',
            //     400: '#34d399',
            //     500: '#10b981',
            //     600: '#059669',
            //     700: '#047857',
            //     800: '#065f46',
            //     900: '#064e3b'
            // },
            // warning: {
            //     50: '#fffbeb',
            //     100: '#fef3c7',
            //     200: '#fde68a',
            //     300: '#fcd34d',
            //     400: '#fbbf24',
            //     500: '#f59e0b',
            //     600: '#d97706',
            //     700: '#b45309',
            //     800: '#92400e',
            //     900: '#78350f'
            // },
            // error: {
            //     50: '#fff1f2',
            //     100: '#ffe4e6',
            //     200: '#fecdd3',
            //     300: '#fda4af',
            //     400: '#fb7185',
            //     500: '#f43f5e',
            //     600: '#e11d48',
            //     700: '#be123c',
            //     800: '#9f1239',
            //     900: '#881337'
            // },
            neutral: {
                0: '#ffffff',
                50: '#f4f4f6',
                100: '#e9eaec',
                200: '#d1d4db',
                300: '#9096a2',
                400: '#4d566b',
                500: '#202c46',
                600: '#1b253c'
            },
            blue: {
                50: '#eff6ff',
                100: '#f5f7fe',
                200: '#eaeffd',
                300: '#adbef7',
                400: '#5a7dee',
                500: '#315cea',
                600: '#2a4ec7',
                700: '#2240a4'
            },
            purple: {
                100: '#F8F5FE',
                200: '#F1ECFC',
                300: '#C9B2F3',
                400: '#9265E8',
                500: '#773FE2',
                600: '#6436BF'
            },
            green: {
                100: '#F4FDF7',
                200: '#E9FAEF',
                300: '#A9EBBF',
                400: '#52D880',
                500: '#27CE60',
                600: '#21AF52'
            },
            red: {
                100: '#FCE9EC',
                200: '#F9D2D9',
                300: '#F2A6B4',
                400: '#E9677F',
                500: '#DF2648',
                600: '#B71F3B'
            },
            yellow: {
                100: '#FEF3E6',
                200: '#FDE7CD',
                300: '#FCCF9C',
                400: '#FAB261',
                500: '#F89118',
                600: '#C77414'
            },
            magenta: {
                100: '#FEF6F8',
                200: '#FCEEF1',
                300: '#F4BAC8',
                400: '#E97591',
                500: '#E35275',
                600: '#C24764'
            }
        },
        fontFamily: {
            inter: ['Inter', 'sans-serif'],
            poppins: ['Poppins', 'sans-serif']
        },
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            keyframes: {
                'accordion-down': {
                    from: {height: '0'},
                    to: {height: 'var(--radix-accordion-content-height)'}
                },
                'accordion-up': {
                    from: {height: 'var(--radix-accordion-content-height)'},
                    to: {height: '0'}
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out'
            }
        }
    },
    // eslint-disable-next-line no-undef
    plugins: [require('tailwindcss-animate')]
}

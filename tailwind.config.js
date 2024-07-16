import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                'sf-pro': ['SF Pro', 'sans-serif'],
            },
            colors: {
                primary: {
                    25: 'var(--primary-25)',
                    50: 'var(--primary-50)',
                    100: 'var(--primary-100)',
                    200: 'var(--primary-200)',
                    300: 'var(--primary-300)',
                    400: 'var(--primary-400)',
                    500: 'var(--primary-500)',
                    600: 'var(--primary-600)',
                    700: 'var(--primary-700)',
                    800: 'var(--primary-800)',
                    900: 'var(--primary-900)',
                    950: 'var(--primary-950)',
                },
                secondary: {
                    25: '#f6fff7',
                    50: '#e4ffe5',
                    100: '#c4ffc8',
                    200: '#90ff9a',
                    300: '#50ff66',
                    400: '#00ff29',
                    500: '#00e62b',
                    600: '#00b827',
                    700: '#008b1e',
                    800: '#076d1e',
                    900: '#0b5c1e',
                    950: '#00340f',
                },
                neutral: {
                    25: '#fdfdfe',
                    50: '#f4f7fb',
                    100: '#e9eef5',
                    200: '#cedce9',
                    300: '#a3bed6',
                    400: '#729bbe',
                    500: '#507ea7',
                    600: '#3d658c',
                    700: '#325172',
                    800: '#2d465f',
                    900: '#293c51',
                    950: '#131b25',
                },
                gray: {
                    25: '#fdffff',
                    50: '#f8fafa',
                    100: '#f1f5f6',
                    200: '#e6ecee',
                    300: '#d1dbe1',
                    400: '#b7c6ce',
                    500: '#92a7b5',
                    600: '#8095a7',
                    700: '#6e8193',
                    800: '#5c6c7b',
                    900: '#4c5a66',
                    950: '#313b44',
                },
                error: {
                    25: '#fffafa',
                    50: '#fff1f2',
                    100: '#ffe0e1',
                    200: '#ffc7ca',
                    300: '#ffa0a4',
                    400: '#ff686f',
                    500: '#fa3942',
                    600: '#e71b25',
                    700: '#c3121a',
                    800: '#a9141b',
                    900: '#85171c',
                    950: '#490609',
                },
                warning: {
                    25: '#fefefb',
                    50: '#fcf8ea',
                    100: '#f9efc8',
                    200: '#f4dc94',
                    300: '#edc257',
                    400: '#e5a82a',
                    500: '#d6911c',
                    600: '#a96614',
                    700: '#934f15',
                    800: '#7a4019',
                    900: '#68351b',
                    950: '#3d1b0b',
                }
            },
        },
        fontSize: {
            'xss': ['10px', {
                lineHeight: '12px'
            }],
            'xs': ['12px', {
                lineHeight: '14px'
            }],
            'sm': ['14px', {
                lineHeight: '16px'
            }],
            'base': ['16px', {
                lineHeight: '19px'
            }],
            'lg': ['20px', {
                lineHeight: '29px'
            }],
            'xl': ['24px', {
                lineHeight: '32px'
            }],
            '2xl': ['28px', {
                lineHeight: '33px'
            }],
            '3xl': ['32px', {
                lineHeight: '38px'
            }],
        },
        screens: {
            'xl': '1280px',
            'lg': '1024px',
            'md': '768px',
            'sm': '360px',
        }
    },

    plugins: [forms],
};
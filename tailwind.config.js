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
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                brand: {
                    50: '#fdf2f3',
                    100: '#fbe3e4',
                    200: '#f6c6c9',
                    300: '#eb9aa0',
                    400: '#dd636e',
                    500: '#c8313f',
                    600: '#a91f2c',
                    700: '#8a1722',
                    800: '#6f141d',
                    900: '#5c131a',
                },
            },
        },
    },

    plugins: [forms],
};

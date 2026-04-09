/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#003366', // Deep Blue
                secondary: '#0055A4', // Lighter Blue
                accent: '#FFD700', // Gold
                light: '#F0F4F8',
                dark: '#1A202C',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}

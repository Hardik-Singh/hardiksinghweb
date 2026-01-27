/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['selector', '[data-theme="dark"]'],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Japanese Color Palette
                'washi': '#FAF7F2',       // Rice Paper - Primary background
                'kinu': '#F5F1EA',         // Silk - Section alternates
                'tatami': '#EDE8DD',       // Cards, containers
                'sumi': '#1A1A1A',         // Ink - Primary text
                'bokusui': '#4A4A4A',      // Ink Gray - Secondary text
                'hai': '#8B8B8B',          // Ash - Muted text
                'sakura': '#F4A7B9',       // Primary accent
                'ume': '#E8879B',          // Plum - Secondary accent
                'kintsugi': '#C9A961',     // Gold - Special highlights
                'ishi': '#D4CFC4',         // Stone - Borders

                // Legacy mappings for compatibility
                'primary': '#F4A7B9',
                'secondary': '#E8879B',
                'accent': '#C9A961',
                'bg-primary': '#FAF7F2',
                'bg-secondary': '#F5F1EA',
                'bg-tertiary': '#EDE8DD',
                'text-primary': '#1A1A1A',
                'text-secondary': '#4A4A4A',
                'text-muted': '#8B8B8B',
                'border': '#D4CFC4',
            },
            fontFamily: {
                'display': ['Cormorant Garamond', 'Georgia', 'serif'],
                'body': ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'sway': 'sway 3s ease-in-out infinite',
                'brush-draw': 'brushDraw 2s ease-out forwards',
                'petal-fall': 'petalFall 10s linear infinite',
                'bounce-slow': 'bounce 2s infinite',
                'fade-in-up': 'fadeInUp 0.6s ease forwards',
                'fade-in-left': 'fadeInLeft 0.6s ease forwards',
                'fade-in-right': 'fadeInRight 0.6s ease forwards',
            },
            keyframes: {
                'float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'sway': {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                },
                'brushDraw': {
                    '0%': { strokeDashoffset: '1000', opacity: '0' },
                    '10%': { opacity: '1' },
                    '100%': { strokeDashoffset: '0', opacity: '1' },
                },
                'petalFall': {
                    '0%': { transform: 'translateY(-10%) rotate(0deg)', opacity: '1' },
                    '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '0.3' },
                },
                'fadeInUp': {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'fadeInLeft': {
                    '0%': { opacity: '0', transform: 'translateX(-30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                'fadeInRight': {
                    '0%': { opacity: '0', transform: 'translateX(30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
            },
            backgroundImage: {
                'gradient-sakura': 'linear-gradient(135deg, #F4A7B9 0%, #E8879B 100%)',
                'gradient-kintsugi': 'linear-gradient(135deg, #C9A961 0%, #D4B978 100%)',
            },
            boxShadow: {
                'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
                'md': '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
                'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                'warm': '0 4px 20px rgba(244, 167, 185, 0.15)',
            },
        },
    },
    plugins: [],
}

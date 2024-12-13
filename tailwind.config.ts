import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          base: '#F24D0D',
          dark: '#C43C08',
        },
        blue: {
          light: '#D7EFF9',
          base: 'var(--blue-base)',
          dark: '#009CF0',
        },
        white: '#FFFFFF',
        background: '#FBF4F4',
        shape: '#F5EAEA',
        gray: {
          100: '#ADADAD',
          200: 'var(--gray-200)',
          300: '#666666',
          400: '#3D3D3D',
          500: '#1D1D1D',
        },
        danger: '#DC3545',
        success: '#28A745',
      },
      fontSize: {
        'title-lg': [
          '1.75rem',
          {
            lineHeight: '1.2rem',
            fontWeight: '700',
          },
        ],
        'title-md': [
          '1.5rem',
          {
            lineHeight: '1.2rem',
            fontWeight: '700',
          },
        ],
        'title-sm': [
          '1.125rem',
          {
            lineHeight: '1.2rem',
            fontWeight: '700',
          },
        ],
        subtitle: [
          '1rem',
          {
            lineHeight: '1.2rem',
            fontWeight: '600',
          },
        ],
        'body-md': [
          '1rem',
          {
            lineHeight: '1.2rem',
            fontWeight: '400',
          },
        ],
        'body-sm': [
          '0.875rem',
          {
            lineHeight: '1.2rem',
            fontWeight: '400',
          },
        ],
        'body-xs': [
          '0.75rem',
          {
            lineHeight: '1.2rem',
            fontWeight: '400',
          },
        ],
        'label-md': [
          '0.75rem',
          {
            lineHeight: '1.2rem',
            fontWeight: '500',
          },
        ],
        'label-sm': [
          '0.625rem',
          {
            lineHeight: '1.2rem',
            fontWeight: '500',
          },
        ],
        'action-md': [
          '1rem',
          {
            lineHeight: '1.2rem',
            fontWeight: '500',
          },
        ],
        'action-sm': [
          '0.875rem',
          {
            lineHeight: '1.2rem',
            fontWeight: '500',
          },
        ],
      },
      fontFamily: {
        'dm-sans': ['var(--font-dm-sans)'],
        sans: ['var(--font-poppins)'],
      },
      borderRadius: {
        xl: '10px',
        '2xl': '12px',
        '4xl': '2rem',
        'product-card': '16px',
        card: '20px',
      },
      spacing: {
        '30': '7.5rem',
      },
      width: {
        '23': '90px',
        '42': '168px',
        '50': '200px',
        'product-card': '331px',
        'product-image': '415px',
      },
      height: {
        '0.25': '1px',
        'product-image': '340px',
        '88': '360px',
      },
      margin: {
        '42': '168px',
      },
      padding: {
        '2.5': '10px',
        'text-error': '6px',
      },
      gap: {
        '0.25': '0.104166667rem',
      },
      keyframes: {
        'slide-down-and-fade': {
          from: {
            opacity: '0',
            transform: 'translateY(-2px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        slide: 'slide-down-and-fade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

export default config

/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          primary: '#201942',
          'bg-base-100': '#FAFAFA',
          'primary-content': '#FFFFFF',
          success: '#00A843',
          warning: '#F4B14B',
          'dark-content': 'black',
        },
      },
    ],
  },

  plugins: [require('daisyui')],
}

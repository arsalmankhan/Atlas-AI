/** @type {import('tailwindcss').Config} */

export default {

  darkMode: 'media',

  content: [

    "./index.html",

    "./src/**/*.{js,ts,jsx,tsx}",

  ],

  theme: {

    extend: {

      keyframes: {

        fadeIn: {

          '0%': { opacity: '0', transform: 'translateY(4px)' },

          '100%': { opacity: '1', transform: 'translateY(0)' },

        },

        blink: {

          '0%, 80%, 100%': { opacity: '.2' },

          '40%': { opacity: '1' },

        },

      },

      animation: {

        fadeIn: 'fadeIn .25s ease',

        blink: 'blink 1s infinite ease-in-out',

      },

    },

  },

  plugins: [],

};
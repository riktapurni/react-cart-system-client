import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
   theme: {
        extend: {
          fontFamily: {
            satoshi: ['Satoshi', 'sans-serif'],
          },
          colors: {
            'shop-black': '#000000',
            'shop-red': '#FF3333',
          }
        }
      },
  plugins: [tailwindcss(),react()],
})

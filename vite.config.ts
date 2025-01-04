import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), 
    VitePWA({
      //registerType: 'autoUpdate',
      registerType:'prompt',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'ShopKirana PWA App',
        short_name: 'Shop Kirana',
        description: 'This is my PWA app for shopping list',
        theme_color: '#ffffff',
        icons: [
          {
            src: './assets/shopping-bag.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/shopping-bag.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
		template: { transformAssetUrls }
	}),
	quasar({
		sassVariables: 'src/quasar-variables.sass'
	})],
  server: {
    watch: {
      usePolling: true,
    },
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 3000, // replace this port with any number you want
  },
})

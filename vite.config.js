import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import vue from '@vitejs/plugin-vue';
import { URL, fileURLToPath } from "url";
import { defineConfig } from 'vite';

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
	resolve: {
		alias: [
			{ find: '@components', replacement: fileURLToPath(new URL('./src/components', import.meta.url)) },
			{ find: '@views', replacement: fileURLToPath(new URL('./src/views', import.meta.url)) },
			{ find: '@utils', replacement: fileURLToPath(new URL('./src/utils', import.meta.url)) },
			{ find: '@composables', replacement: fileURLToPath(new URL('./src/composables', import.meta.url)) },
		]
	}
})

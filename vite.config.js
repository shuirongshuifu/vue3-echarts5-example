import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const isProduction = mode === 'production';
    const config = {
        // base: isProduction ? '/extraPro/' : '/',
        base: '/',
        resolve: {
            // 别名
            alias: {
                '@': resolve(__dirname, 'src'),
            },
        },
        plugins: [vue()],
        server: {
            port: 9876,
            host: true,
            open: true,
            // https: true,
            proxy: {}
        }
    };
    return config;
});
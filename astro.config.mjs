// @ts-check
import { defineConfig } from 'astro/config';
import dataImage from './plugins/data-image'

// https://astro.build/config
export default defineConfig({
    outDir: './dist',
    integrations: [dataImage()]
});

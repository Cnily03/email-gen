// @ts-check
import { defineConfig } from 'astro/config';
import icon from "astro-icon";
import dataImage from './plugins/data-image'

// https://astro.build/config
export default defineConfig({
    outDir: './dist',
    integrations: [icon(), dataImage()]
});

import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from 'vite-imagetools'

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [sveltekit(), imagetools({ force: true })],
};

export default config;
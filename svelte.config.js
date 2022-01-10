import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex'


/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    extensions: ['.svelte', '.svx', '.md'],
    preprocess: [mdsvex({ extensions: ['.svx', '.md'] }), preprocess()],

    kit: {
        adapter: adapter(),

        // hydrate the <div id="svelte"> element in src/app.html
        target: '#svelte'
    }
};

export default config;

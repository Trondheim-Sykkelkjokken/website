import { writable } from 'svelte/store';

export const navOpen = writable(false);

export const setNavOpen = (state: boolean) => navOpen.update(() => state);
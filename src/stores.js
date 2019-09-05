import { writable  } from 'svelte/store';

export const ready = writable(false);
export const code = writable('');
export const html = writable('');
export const tab = writable('viewer');
export const injectedLibraries = writable([]);
export const injectedJS = writable('');

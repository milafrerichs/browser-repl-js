import { writable, derived } from 'svelte/store';

export const ready = writable(false);
export const code = writable('');
export const html = writable('');
export const tab = writable('viewer');
export const injectedLibraries = writable([]);
export const injectedCSS = writable('');
export const injectedJS = writable('');

export const files = writable([]);
export const currentFileIndex = writable(0);

export const currentFile = derived(
  [files, currentFileIndex],
  ([$files, $currentFileIndex]) => $files[$currentFileIndex]
);

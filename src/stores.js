import { writable, derived } from 'svelte/store';

export const code = writable('');
export const html = writable('');
export const tab = writable('viewer');
export const injectedLibraries = writable([]);
export const injectedCSS = writable('');
export const injectedJS = writable('');

export const logs = writable([]);
export const files = writable([]);
export const currentFileIndex = writable(0);

export const currentFile = derived(
  [files, currentFileIndex],
  ([$files, $currentFileIndex]) => $files[$currentFileIndex]
);

const createIframe = () => {
  const { subscribe, set, update } = writable({});

  return {
    subscribe,
    setReady: (ready, name) => {
      return update((n) => {
        n[name] = ready;
        return n;
      })
    }
  }
}
export const iframeReady = createIframe();

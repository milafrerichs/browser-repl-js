import { writable, derived } from 'svelte/store';

const createInjectedLibraries = () => {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    merge: (libs) => {
      return update((n) => {
        return n.concat(libs);
      })
    },
    add: (lib) => {
      return update((n) => {
        if(n.filter((d) => d === lib).length < 1) {
          n = n.push(lib);
        }
        return n;
      })
    }
  }
}
const createBundle = () => {
  const { subscribe, set, update } = writable({});

  return {
    subscribe,
    changeCode: (file, code) => {
      return update((n) => {
        n[file.name] = code;
        return n;
      })
    }
  }
}

const concatHTML = (content) => {
  return `document.body.innerHTML = '${content}';`;
}

export const code = writable('');
export const html = writable('');
export const tab = writable('viewer');
export const injectedCSS = writable('');
export const injectedJS = writable('');

export const injectedLibraries = createInjectedLibraries();
export const logs = writable([]);
export const files = writable([]);
export const currentFileIndex = writable(0);
export const bundle = createBundle();

export const currentFile = derived(
  [files, currentFileIndex],
  ([$files, $currentFileIndex]) => $files[$currentFileIndex]
);

export const currentContent = derived(
  [currentFile, bundle],
  ([$currentFile, $bundle]) => {
    if($currentFile) {
      if($bundle[$currentFile.name]){
        return $bundle[$currentFile.name];
      }
      return $currentFile.content;
    }
  }
);

export const bundledCode = derived(
  [files, bundle], ([$files, $bundle]) =>  {
   let code = $files.map((file) => {
     let content  = '';
      if($bundle[file.name]) {
        content = $bundle[file.name];
      } else {
        content = file.content;
      }
      if(file.type === 'html') {
        return concatHTML(content);
      }
      return content;
   })
   return code.join('\n');
  }
)

<script>
  import { setContext, onMount, onDestroy } from 'svelte';
  import { writable } from 'svelte/store';

  import Viewer from './Viewer.svelte';
  import ViewerConsole from './ViewerConsole.svelte';
  import Editor from './Editor.svelte';
  import Console from './Console.svelte';
  import Default from './layouts/Default.svelte';
  import Minimal from './layouts/Minimal.svelte';
  import MinimalReverse from './layouts/MinimalReverse.svelte';
  import View from './layouts/View.svelte';

  import {
    code,
    html,
    files as file_store,
    injectedJS as injectedJS_store,
    injectedLibraries as injectedLibraries_store,
    currentFileIndex,
    currentContent,
    currentFile,
    bundledCode,
    bundle
  } from './stores.js'

  let editor;
  let output;
  let width;
  let height;

  const layouts = new Map([
    [ 'default', Default ],
    [ 'minimal-reverse', MinimalReverse ],
    [ 'minimal', Minimal ],
    [ 'view', View ]
  ]);

  export let layout = 'default';
  export let changedCode = () => {};
  export let files = [];
  export let injectedLibraries = [];
  export let injectedJS = '';
  export let cssStyles = {
    container: 'container',
    resultContainer: 'result-container',
    viewerContainer: 'viewer-container',
    viewerConsoleContainer: 'viewer-console-container',
    editorActions: {
      container: '',
      tabItem: '',
      link: ''
    },
    viewerActions: {
      container: '',
      tabItem: '',
      link: ''
    },
    editor: 'editor',
    viewer: 'viewer',
  };

  const selected = writable(null);

  setContext('REPL', {
    navigate: index => {
      handleSelect()
    },
    handleChange: event => {
      bundle.changeCode($currentFile, event);
      changedCode(event)
    },
    registerEditor(registredEditor) {
      editor = registredEditor;
      editor.set($currentContent);
    },
  });

  function handleSelect() {
    editor.set($currentContent);
  }

  $: if(files) {
    file_store.set(files);
  }
  $: if(injectedJS) {
    injectedJS_store.set(injectedJS);
  }
  $: if(injectedLibraries.length > 0) {
    injectedLibraries_store.merge(injectedLibraries);
  }

  $: selectedLayout = layouts.get(layout || 'default')

</script>

<style>
  .hidden {
    visibility: hidden;
  }
  .content-container {
    transition-property: all;
    transition-duration: .5s;
    transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  }
  .hide-content .content-container{
    max-width: 0;
    overflow-x: hidden;
  }
  .hide-content .result-container {
    width: 95%;
  }
</style>

<svelte:component this={selectedLayout} {cssStyles} bind:width={width} bind:height={height} >
  <div slot="editor">
    <Editor />
  </div>
  <div slot="viewer">
    <Viewer {width} {height} />
  </div>
  <div slot="viewer-console">
    <ViewerConsole {cssStyles} />
  </div>
  <div slot="console">
    <Console {cssStyles} />
  </div>
</svelte:component>

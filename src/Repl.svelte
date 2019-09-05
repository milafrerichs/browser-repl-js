<script>
  import Viewer from './Viewer.svelte';
  import ViewerConsole from './ViewerConsole.svelte';
  import Editor from './Editor.svelte';
  import Console from './Console.svelte';
  import Default from './layouts/Default.svelte';
  import Minimal from './layouts/Minimal.svelte';
  import MinimalReverse from './layouts/MinimalReverse.svelte';

  import {
    code,
    html as html_store,
    ready as ready_store,
    files as file_store,
    currentFile
  } from './stores.js'

  let editor;
  let manualUpdates = false;
  let currentContent = '';

  let html = '';

  const layouts = new Map([
    [ 'default', Default ],
    [ 'minimal-reverse', MinimalReverse ],
    [ 'minimal', Minimal ]
  ]);

  let ready = false;

  const unsubscribe_html = html_store.subscribe(html => {
    html = value;
  });
  const unsubscribe_ready = ready_store.subscribe(value => {
    ready = value;
  });

  export let layout = 'default';
  export let changedCode = () => {};
  export let files = [];
  export let injectedLibraries = [];
  export let injectedJS = '';
  export let debounceTime = 300;
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

  const debounce = (func, delay) => {
    let inDebounce
    return function() {
      const context = this
      const args = arguments
      clearTimeout(inDebounce)
      inDebounce = setTimeout(() =>
        func.apply(context, args)
      , delay)
    }
  }

  const debounceChangeCode = debounce(changeCode, debounceTime);

  function changeCode(event) {
    currentContent = event.detail.value;
    manualUpdates = true;
    changedCode();
    if ($currentFile.type === 'js') {
      code.set(currentContent);
    } else {
      html_store.set(currentContent.replace(/\n/g,''));
    }
  }


  function getContentForType(type = 'js') {
    return files.reduce((content, file) => {
      if(file.type === type) {
        return content + file.content;
      }
      return content;
    }, '');
  }

  function update() {
    code.set(getContentForType('js') || '');
    html_store.set(getContentForType('html') || '');
    if(!html) html = '';
    if(editor) {
      editor.update($currentFile.content);
    }

  }

  $: if(files) {
    file_store.set(files);
  }
  $: if(editor && $currentFile) {
    editor.update($currentFile.content);
  }

  $: if(files && ready) {
    manualUpdates = false;
    update();
  }

  $: if(ready && !manualUpdates) {
    update();
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

<svelte:component this={selectedLayout} {cssStyles} {files} >
  <div slot="editor">
    <Editor bind:this={editor} on:change={debounceChangeCode}/>
  </div>
  <div slot="viewer">
    <Viewer {cssStyles} {injectedLibraries} {injectedJS} />
  </div>
  <div slot="viewer-console">
    <ViewerConsole {cssStyles} {injectedLibraries} {injectedJS} />
  </div>
  <div slot="console">
    <Console {cssStyles} {injectedLibraries} {injectedJS} />
  </div>
</svelte:component>

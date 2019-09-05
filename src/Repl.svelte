<script>
  import Viewer from './Viewer.svelte';
  import Editor from './Editor.svelte';
  import Console from './Console.svelte';
  import Default from './layouts/Default.svelte';
  import Minimal from './layouts/Minimal.svelte';
  import MinimalReverse from './layouts/MinimalReverse.svelte';

  let ready = false;
  let editor;
  let manualUpdates = false;
  let tab = 'viewer';
  let currentFile = {};
  let currentFileIndex = 0;
  let currentContent = '';
  let code = '';
  let html = '';

  const layouts = new Map([
    [ 'default', Default ],
    [ 'minimal-reverse', MinimalReverse ],
    [ 'minimal', Minimal ]
  ]);

  export let mode = 'normal';
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
    if (currentFile.type === 'js') {
      code = currentContent;
    } else {
      html = currentContent.replace(/\n/g,'');
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
    code = getContentForType('js') || '';
    html = getContentForType('html') || '';
    if(!html) html = '';
    if(editor) {
      editor.update(currentFile.content);
    }

  }

  $: showEditor = (mode === 'normal' || mode === 'minimal')
  $: showTabs = (mode === 'normal' || mode === 'view')
  $: showFiles = (mode === 'normal' || mode === 'view')

  $: currentFile = files[currentFileIndex]

  $: if(editor && currentFile) {
    editor.update(currentFile.content);
  }

  $: selectedLayout = layouts.get(layout || 'default')

  $: if(files && ready) {
    manualUpdates = false;
    currentFile = files[currentFileIndex];
    update();
  }

  $: if(ready && !manualUpdates) {
    update();
  }
  function showFile(fileIndex) {
    currentFile.content = currentContent;
    currentFileIndex = fileIndex;
  }
  function showConsole() {
    tab = 'console';
  }
  function showResult() {
    tab = 'viewer';
  }
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

<svelte:component this={selectedLayout} {cssStyles} {tab} {showEditor} {files} >
  <div slot="editor">
    <Editor bind:this={editor} on:change={debounceChangeCode}/>
  </div>
  <div slot="viewer">
    <Viewer bind:ready={ready} {code} {injectedLibraries} {html} {injectedJS} />
  </div>
</svelte:component>

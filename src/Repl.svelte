<script>
	import { onMount, onDestroy } from 'svelte';

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
    iframeReady,
    files as file_store,
    injectedJS as injectedJS_store,
    injectedLibraries as injectedLibraries_store,
    currentFile
  } from './stores.js'

  let editor;
  let manualUpdates = false;
  let layoutiFrameReady = false;
  let currentContent = '';
  let width;
  let height;

  const layouts = new Map([
    [ 'default', Default ],
    [ 'minimal-reverse', MinimalReverse ],
    [ 'minimal', Minimal ],
    [ 'view', View ]
  ]);
  const iframeLayouts = new Map([
    [ 'default', ['viewer', 'console']],
    [ 'minimal-reverse', ['viewer']],
    [ 'minimal', ['viewer']],
    [ 'view', ['viewer']]
  ]);

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

	onMount(() => {
    iframeReady.subscribe((value) => {
      const iframes = iframeLayouts.get(layout || 'default')
      layoutiFrameReady = iframes.reduce((s, v) => (value[v] || false) && s, true)
    })
	});
	onDestroy(() => {
	});

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
      html.set(currentContent.replace(/\n/g,''));
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
    html.set(getContentForType('html') || '');
    if(editor) {
      editor.update($currentFile.content);
    }
  }

  $: if(files) {
    file_store.set(files);
  }
  $: if(injectedJS) {
    injectedJS_store.set(injectedJS);
  }
  $: if(injectedLibraries) {
    injectedLibraries_store.set(injectedLibraries);
  }
  $: if(editor && $currentFile) {
    editor.update($currentFile.content);
  }

  $: if(files && layoutiFrameReady) {
    manualUpdates = false;
    update();
  }

  $: if(layoutiFrameReady && !manualUpdates) {
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

<svelte:component this={selectedLayout} {cssStyles} bind:width={width} bind:height={height} >
  <div slot="editor">
    <Editor bind:this={editor} on:change={debounceChangeCode}/>
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

<script>
  import Viewer from './Viewer.svelte';
  import Editor from './Editor.svelte';
  import Console from './Console.svelte';

  import {
    code as code_store,
    html as html_store,
    ready as ready_store
  } from './stores.js'

  let editor;
  let manualUpdates = false;
  let tab = 'viewer';
  let currentFile = {};
  let currentFileIndex = 0;
  let currentContent = '';

  let code;
  let html = '';
  let ready = false;

  const unsubscribe_code = code_store.subscribe(value => {
    code = value;
  });
  const unsubscribe_html = code_store.subscribe(html => {
    html = value;
  });
  const unsubscribe_ready = ready_store.subscribe(value => {
    ready = value;
  });
  
  export let mode = 'normal';
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
      code_store.set(currentContent);
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
    code_store.set(getContentForType('js') || '');
    html_store.set(getContentForType('html') || '');
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

<div class="{cssStyles.container}" >
  <div class="result-container {cssStyles.resultContainer}">
    {#if showEditor}
      <div class:hidden="{!showEditor}" class="{cssStyles.editor}">
        {#if showFiles}
          <div class="{cssStyles.editorActions.container}">
            {#each files as { name }, i}
              <div class="{cssStyles.editorActions.tabItem}">
                <a class:active="{currentFileIndex == i}" class="{cssStyles.editorActions.link}" on:click="{() => showFile(i)}">{name}</a>
              </div>
            {/each}
          </div>
        {/if}
        <Editor bind:this={editor} on:change={debounceChangeCode}/>
      </div>
    {/if}
    <div class:view-only="{!showEditor}" class="{cssStyles.viewerContainer}">
      {#if showTabs}
        <div class="{cssStyles.viewerActions.container}">
          <div class="{cssStyles.viewerActions.tabItem}">
            <a class:active="{tab == 'viewer'}" class="{cssStyles.viewerActions.link}" on:click="{() => showResult()}">Result</a>
          </div>
          <div class="{cssStyles.viewerActions.tabItem}">
            <a class:active="{tab == 'console'}" class="{cssStyles.viewerActions.link}" on:click="{() => showConsole()}">Console</a>
          </div>
        </div>
    {/if}
      <div class="{cssStyles.viewerConsoleContainer}">
        <div class:hidden="{tab != 'viewer'}" class="{cssStyles.viewer}">
          <Viewer {injectedLibraries} {injectedJS} />
        </div>
        <div class:hidden="{tab != 'console'}" class="{cssStyles.console}">
          <Console output={code} />
        </div>
      </div>
    </div>
  </div>
</div>

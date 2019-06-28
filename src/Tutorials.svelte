<script>
  import Viewer from './Viewer.svelte';
  import Editor from './Editor.svelte';
  import Console from './Console.svelte';

  let code = '';
  let ready = false;
  let editor;
  let completed = false;
  let currentChapter = 0;
  let manualUpdates = false;
  let tab = 'viewer';
  export let chapters = [];
  export let cssStyles = {
    container: 'container',
    content: 'content',
    contentContainer: 'content-actions-container',
    resultContainer: 'result-container',
    viewerContainer: 'viewer-container',
    viewerConsoleContainer: 'viewer-console-container',
    viewerActions: {
      container: '',
      tabItem: '',
      link: ''
    },
    editor: 'editor',
    viewer: 'viewer',
    actions: 'actions',
    button: {
      show: 'show',
      next: 'next',
      prev: 'prev'
    }
  };

  function changeCode(event) {
    manualUpdates = true
    code = event.detail.value;
  }
  $: chapter = chapters[currentChapter];

  $: if(ready && !manualUpdates) {
    code = completed ? chapter.solution : chapter.code;
    if(editor) editor.update(code);
  }
  function next() {
    manualUpdates = false;
    completed = false;
    tab = 'viewer';
    currentChapter++;
  }
  function prev() {
    manualUpdates = false;
    completed = false;
    tab = 'viewer';
    currentChapter--;
  }
  function reset() {
    manualUpdates = false;
    completed = false;
  }
  function complete() {
    manualUpdates = false;
    completed = true;
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
</style>

<div class="{cssStyles.container}">
  <div class="{cssStyles.contentContainer}">
    <div class="{cssStyles.content}">
      {@html chapter.content}
    </div>
    <div class="{cssStyles.actions}">
      {#if !chapter.viewOnly }
        <button class="{cssStyles.button.default} {cssStyles.button.show}" on:click="{() => completed ? reset() : complete()}">
          {completed ? 'Reset' : 'Show me'}
        </button>
      {/if}
      {#if currentChapter < (chapters.length-1) }
        <button class="{cssStyles.button.default} {cssStyles.button.next}" on:click="{() => next()}">
          Next
        </button>
      {/if}
      {#if currentChapter > 0 }
        <button class="{cssStyles.button.default} {cssStyles.button.prev}" on:click="{() => prev()}">
          Previous
        </button>
      {/if}
    </div>
  </div>
  <div class="{cssStyles.resultContainer}">
    {#if !chapter.viewOnly }
      <div class:hidden="{chapter.viewOnly}" class="{cssStyles.editor}">
        <Editor bind:this={editor} on:change={changeCode}/>
      </div>
    {/if}
    <div class:view-only="{chapter.viewOnly}" class="{cssStyles.viewerContainer}">
      <div class="{cssStyles.viewerActions.container}">
        <div class="{cssStyles.viewerActions.tabItem}">
          <a class:active="{tab == 'viewer'}" class="{cssStyles.viewerActions.link}" on:click="{() => showResult()}">Result</a>
        </div>
        <div class="{cssStyles.viewerActions.tabItem}">
          <a class:active="{tab == 'console'}" class="{cssStyles.viewerActions.link}" on:click="{() => showConsole()}">Console</a>
        </div>
      </div>
      <div class="{cssStyles.viewerConsoleContainer}">
        <div class:hidden="{tab != 'viewer'}" class="{cssStyles.viewer}">
          <Viewer bind:ready {code} />
        </div>
        <div class:hidden="{tab != 'console'}" class="{cssStyles.console}">
          <Console bind:ready output={code} />
        </div>
      </div>
    </div>
  </div>
</div>

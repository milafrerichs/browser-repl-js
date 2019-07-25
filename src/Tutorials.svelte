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
  let toggleText = '';
  let tab = 'viewer';
  let contentVisible = true;
  export let chapters = [];
  export let cssStyles = {
    container: 'container',
    content: 'content',
    contentContainer: 'content-actions-container',
    resultContainer: 'result-container',
    progressContainer: 'progress-container',
    viewerContainer: 'viewer-container',
    viewerConsoleContainer: 'viewer-console-container',
    toggleContentContainer: 'toggle-content-container',
    chaptersContainer: 'chapters-container',
    chapters: {
      current: 'current-chapter',
      chapters: 'chapters',
      chapter: 'chapters-chapter'
    },
    progress: {
      container: 'progress',
      chapter: 'progress-chapter'
    },
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
      prev: 'prev',
      toggle: 'toggle'
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
  function toggleContent() {
    contentVisible = !contentVisible;
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

<div class="{cssStyles.container}" class:hide-content="{!contentVisible}">
  <div class="{cssStyles.chaptersContainer}">
    <div class="{cssStyles.chapters.current}">{chapter.title}</div>
    <div class="{cssStyles.chapters.chapters}">
      {#if currentChapter > 0 }
        <button class="{cssStyles.button.default} {cssStyles.button.prev}" on:click="{() => prev()}">
          Previous
        </button>
      {/if}
      {#each chapters as c, i}
        <div class="{cssStyles.chapters.chapter}" on:click="{() => currentChapter = i}"class:active="{i == currentChapter}">{c.title}</div>
      {/each}
      {#if currentChapter < (chapters.length-1) }
        <button class="{cssStyles.button.default} {cssStyles.button.next}" on:click="{() => next()}">
          Next
        </button>
      {/if}
    </div>
  </div>
  <div class="content-container {cssStyles.contentContainer}">
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
  <div class="{cssStyles.toggleContentContainer}">
    <button class="{cssStyles.button.default} {cssStyles.button.toggle}" on:click="{() => toggleContent()}">{toggleText}</button>
  </div>
  <div class="result-container {cssStyles.resultContainer}">
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
  <div class="{cssStyles.progressContainer}">
    <div class="{cssStyles.progress.container}">
      {#each chapters as c, i}
        <div class="{cssStyles.progress.chapter}" class:active="{i == currentChapter}"></div>
      {/each}
    </div>
  </div>
</div>

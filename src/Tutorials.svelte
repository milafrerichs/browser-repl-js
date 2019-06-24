<script>
  import Viewer from './Viewer.svelte';
  import Editor from './Editor.svelte';
  import Console from './Console.svelte';

  let code = '';
  let ready = false;
  let editor;
  let completed = false;
  let currentChapter = 0;
  let manualUpdates = false
  export let chapters = [];
  export let cssStyles = {
    container: 'container',
    content: 'content',
    contentContainer: 'content-actions-container',
    resultContainer: 'result-container',
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
    editor.update(code);
  }
  function next() {
    manualUpdates = false;
    currentChapter++;
  }
  function prev() {
    manualUpdates = false;
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
</script>

<style>
</style>

<div class="{cssStyles.container}">
  <div class="{cssStyles.contentContainer}">
    <div class="{cssStyles.content}">
      {@html chapter.content}
    </div>
    <div class="{cssStyles.actions}">
      <button class="{cssStyles.button.default} {cssStyles.button.show}" on:click="{() => completed ? reset() : complete()}">
        {completed ? 'Reset' : 'Show me'}
      </button>
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
  <!-- Using the chapter.code here is a bit hacky, but update does not work in the ready watch, and setting the code earlier will cause the viewer to fail -->
    <div class="{cssStyles.editor}">
      <Editor bind:this={editor} on:change={changeCode}/>
    </div>
    <div class="{cssStyles.viewer}">
      <Viewer bind:ready {code} />
      <Console bind:ready output={code} />
    </div>
  </div>
</div>

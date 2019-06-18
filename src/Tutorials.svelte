<script>
	import Viewer from './Viewer.svelte';
	import Editor from './Editor.svelte';

	let code = '';
	let ready = false;
	let editor;
	let completed = false;
	let currentChapter = 0;
	export let chapters = [];
  export let cssStyles;

	function changeCode(event) {
		code = event.detail.value;
	}
	$: chapter = chapters[currentChapter];

	$: if(ready) {
		code = chapter.code;
		editor.update(code);
	}
	function next() {
		currentChapter++;
	}
	function prev() {
		currentChapter--;
	}
	function reset() {
		completed = false;
		code = chapter.code;
		editor.update(code);
	}
	function complete() {
		completed = true;
		code = chapter.solution;
		editor.update(code);
	}
</script>

<style>
</style>

<div class="container {cssStyles.container}">
  <div class="content-actions-container {cssStyles.contentContainer}">
    <div class="content {cssStyles.content}">
      {@html chapter.content}
    </div>
    <div class="actions {cssStyles.actions}">
      <button class="show {cssStyles.button.default} {cssStyles.button.show}" on:click="{() => completed ? reset() : complete()}">
        {completed ? 'Reset' : 'Show me'}
      </button>
      {#if currentChapter < (chapters.length-1) }
        <button class="next {cssStyles.button.default} {cssStyles.button.next}" on:click="{() => next()}">
          Next
        </button>
      {/if}
      {#if currentChapter > 0 }
        <button class="prev {cssStyles.button.default} {cssStyles.button.prev}" on:click="{() => prev()}">
          Previous
        </button>
      {/if}
    </div>
  </div>
  <div class="result-container {cssStyles.resultContainer}">
  <!-- Using the chapter.code here is a bit hacky, but update does not work in the ready watch, and setting the code earlier will cause the viewer to fail -->
    <div class="editor {cssStyles.editor}">
      <Editor bind:this={editor} code={chapter.code} on:change={changeCode}/>
    </div>
    <div class="viewer {cssStyles.viewer}">
      <Viewer bind:ready code={code} />
    </div>
  </div>
</div>

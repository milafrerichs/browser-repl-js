<script>
	import Viewer from './Viewer.svelte';
	import Editor from './Editor.svelte';

	let code = '';
	let ready = false;
	let editor;
	let completed = false;
	let currentChapter = 0;
	export let chapters = [];

	function changeCode(event) {
		code = event.detail.value;
	}
	$: chapter = chapters[currentChapter];

	$: if(ready) {
		code = chapter.code;
	}
	function next() {
		currentChapter++;
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

<div>
	<div class="content">
		{@html chapter.content}
	</div>
	<div class="actions">
		<button class="show" on:click="{() => completed ? reset() : complete()}">
			{completed ? 'Reset' : 'Show me'}
		</button>
		{#if currentChapter < (chapters.length-1) }
			<button class="next" on:click="{() => next()}">
				Next
			</button>
		{/if}
	</div>
</div>
<!-- Using the chapter.code here is a bit hacky, but update does not work in the ready watch, and setting the code earlier will cause the viewer to fail -->
<Editor bind:this={editor} code={chapter.code} on:change={changeCode}/>
<Viewer bind:ready code={code} />

<script>
	import Viewer from './Viewer.svelte';
	import Editor from './Editor.svelte';

	import marked from 'marked';

	let content = marked('# Test');
	let chapter = {
		content,
		title: 'Chapter 1',
		code: 'document.body.innerHTML = "Test"',
		solution: 'document.body.innerHTML = "Solution"'
	};
	let code = '';
	let ready = false;
	let completed = false;
	function changeCode(event) {
		code = event.detail.value;
	}
	$: if(ready) {
		code = chapter.code
	}
	function reset() {
		completed = false;
		code = chapter.code;
	}
	function complete() {
		completed = true;
		code = chapter.solution;
	}
</script>

<style>
</style>

<div>
	{@html chapter.content}
	<button class="show" on:click="{() => completed ? reset() : complete()}">
		{completed ? 'Reset' : 'Show me'}
	</button>
</div>
<!-- Editor must habe the code as well -->
<Editor mode="js" code={code} on:change={changeCode}/>
<Viewer bind:ready code={code} />


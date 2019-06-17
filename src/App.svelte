<script>
	import Explanation from './Explanation.svelte';
	import Viewer from './Viewer.svelte';
	import Editor from './Editor.svelte';

	import marked from 'marked';

	let content = marked('# Test');
	let chapter = {
		content,
		title: 'Chapter 1',
		code: 'document.body.innerHTML = "Test"'
	};
	let code = '';
	let ready = false;
	function changeCode(event) {
		code = event.detail.value;
	}
	$: if(ready) {
		code = chapter.code
	}
</script>

<style>
</style>

<Explanation chapter={chapter} />

<!-- Editor must habe the code as well -->
<Editor mode="js" code={code} on:change={changeCode}/>
<Viewer bind:ready code={code} />


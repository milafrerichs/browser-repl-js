<script>
	import Code from './Code.svelte';
	import Viewer from './Viewer.svelte';
	import Editor from './Editor.svelte';

	let code = '';
	function changeCode(event) {
		code = event.detail.value;
	}
</script>

<style>
</style>

<Editor mode="js" on:change={changeCode}/>
<Viewer code={code} />

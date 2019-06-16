<script>
	import Code from './Code.svelte';
	import Viewer from './Viewer.svelte';
	let code;
	let message = "";
	let iframe;
	function handleSubmit() {
		iframe.contentWindow.postMessage({ script: code }, '*');
	}
</script>

<style>
</style>

<Code bind:code={code} on:submit={handleSubmit}/>
<Viewer bind:iframe={iframe} />

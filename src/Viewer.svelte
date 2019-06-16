<script>
	import srcdoc from './srcdoc/index.js';
	export let iframe;
</script>
<iframe
	title="Result"
	sandbox="allow-scripts allow-same-origin"
	bind:this={iframe}
	{srcdoc}
	></iframe>

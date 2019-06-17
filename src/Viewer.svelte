<script>
	import srcdoc from './srcdoc/index.js';
	import { onMount } from 'svelte';
	let iframe;
	export let injectedJS = '';
	export let injectedCSS = '';
	export let code = '';
	export let ready;
	let message = '';
	onMount(() => {
		iframe.addEventListener('load', () => {
			ready = true;
		});
	});
	$: if(code) {
		message = `
		document.body.innerHTML = '';
		${code}
		`
		iframe.contentWindow.postMessage({ script: message }, '*');
	}
</script>
<iframe
	title="Result"
	sandbox="allow-scripts allow-same-origin"
	bind:this={iframe}
	{srcdoc}
	></iframe>

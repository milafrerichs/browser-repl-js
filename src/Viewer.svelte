<script>
	import srcdoc from './srcdoc/index.js';
	import { onMount } from 'svelte';
	let iframe;
	export let injectedJS = '';
	export let injectedCSS = '';
  export let injectedLibraries = [];
  export let html = '';
	export let code = '';
	export let ready = false;
	let message = '';
	onMount(() => {
		iframe.addEventListener('load', () => {
			ready = true;
		});
	});
	$: if(ready && (code || html)) {
		message = `
    ${injectedJS}
    ${styles}
		document.body.innerHTML = '';
    document.body.innerHTML = '${html}';
		${code}
		`
		iframe.contentWindow.postMessage({ script: message }, '*');
	}
  $: styles = injectedCSS && `{
    const style = document.createElement('style');
    style.textContent = ${JSON.stringify(injectedCSS)};
    document.head.appendChild(style);
  }`;
  $: if(injectedLibraries.length > 0) {
    libraries = injectedLibraries.map((lib) => {
      return `{
        const script = document.createElement('script');
        script.type= 'text/javascript';
        script.src = '${lib}';
        document.head.appendChild(script);
      }`
    })
  }
</script>
<iframe
	title="Result"
	sandbox="allow-scripts allow-same-origin"
	bind:this={iframe}
	{srcdoc}
	></iframe>

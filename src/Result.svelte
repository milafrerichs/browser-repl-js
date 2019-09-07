<script>
	import srcdoc from './srcdoc/index.js';
	import { onMount } from 'svelte';

  import {
    ready,
    injectedJS,
    injectedLibraries
  } from './stores.js'

	let iframe;
	export let injectedCSS = '';
  export let width;
  export let height;
  export let code;
  export let html;

	let message = '';
	onMount(() => {
		iframe.addEventListener('load', () => {
			ready.set(true);
		});
	});
	$: if($ready && (code || html)) {
		message = `
    ${$injectedJS}
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
  $: if($injectedLibraries.length > 0) {
    libraries = $injectedLibraries.map((lib) => {
      return `{
        const script = document.createElement('script');
        script.type= 'text/javascript';
        script.src = '${lib}';
        document.head.appendChild(script);
      }`
    })
  }
  function handleResize() {
		iframe.contentWindow.postMessage({ script: message }, '*');
  }
</script>
<svelte:window on:resize={handleResize}/>
<iframe
	title="Result"
	sandbox="allow-scripts allow-same-origin"
	bind:this={iframe}
	{srcdoc}
  {width}
  {height}
	></iframe>

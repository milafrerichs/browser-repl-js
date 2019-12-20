<script>
	import srcdoc from './srcdoc/index.js';
	import { onMount, onDestroy } from 'svelte';

  import {
    injectedJS,
    injectedLibraries,
    iframeReady
  } from './stores.js'

	let iframe;
	export let injectedCSS = '';
  export let width;
  export let height;
  export let code;
  export let html;
  export let name = 'viewer';
  let ready = false;

	let message = '';

  const setReady = () => {
    iframeReady.setReady(true, name)
    iframeReady.subscribe((value) => {
      ready = value[name] || false;
    })
  }
	onMount(() => {
		iframe.addEventListener('load', setReady);
	});
	onDestroy(() => {
    iframeReady.setReady(false, name)
		iframe.removeEventListener('load', setReady);
	});
	$: if(ready && iframe && (code || html)) {
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

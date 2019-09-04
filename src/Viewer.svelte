<script>
	import srcdoc from './srcdoc/index.js';
	import { onMount } from 'svelte';

  import {
    code as code_store,
    html as html_store,
    ready as ready_store
  } from './stores.js'

	let iframe;
	export let injectedJS = '';
	export let injectedCSS = '';
  export let injectedLibraries = [];

  let code;
  let html;
  let ready;

  const unsubscribe_code = code_store.subscribe(value => {
    code = value;
  });
  const unsubscribe_html = html_store.subscribe(value => {
    html = value;
  });
  const unsubscribe_ready = ready_store.subscribe(value => {
    ready = value;
  });
	let message = '';
	onMount(() => {
		iframe.addEventListener('load', () => {
			ready_store.set(true);
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

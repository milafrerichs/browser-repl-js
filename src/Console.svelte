<script>
	import Result from './Result.svelte';
	import { onMount } from 'svelte';

  import { code } from './stores.js'

  export let width;
  export let height;

  let message = '';
	$: if($code) {
		message = `
		document.body.innerHTML = '';
    var consoleOutput = '';
    var old = console.log;
    const script = document.createElement('script');
    script.type= 'text/javascript';
    script.src = 'https://cdn.jsdelivr.net/gh/milafrerichs/svelte-json-tree@098ffbf4bcd7aa982ce17c5899195e1a6396c7dd/index.js';
    document.head.appendChild(script);
    console.log = function (message) {
    			new JsonTree({
				target: document.body,
				props: {
					value: message
				}
			});
    };
		${$code}
		`
	}
</script>
<Result name={'console'} {width} {height} html={''} code={message} />

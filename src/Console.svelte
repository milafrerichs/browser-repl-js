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
    console.log = function (message) {
      if (typeof message == 'object') {
        consoleOutput += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
      } else {
        consoleOutput += message + '<br />';
      }
    };
		${$code}
		document.body.innerHTML = '';
    document.body.innerHTML = consoleOutput;
		`
	}
</script>
<Result {width} {height} html={''} code={message} />

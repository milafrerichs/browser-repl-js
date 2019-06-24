<script>
	import Viewer from './Viewer.svelte';
	import { onMount } from 'svelte';
  export let output
  let message = '';
	$: if(output) {
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
		${output}
		document.body.innerHTML = '';
    document.body.innerHTML = consoleOutput;
		`
	}
</script>
<Viewer code={message} />

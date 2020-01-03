<script>
  import { getContext, onMount, onDestroy } from 'svelte';

  import srcdoc from './srcdoc/index.js';

  import ReplProxy from './ReplProxy.js';

  import {
    injectedJS,
    injectedLibraries,
    bundle,
    bundledCode,
    logs
  } from './stores.js'

  const { registerOutput } = getContext('REPL');

  let iframe;
  export let injectedCSS = '';
  export let width;
  export let height;
  export let code;
  export let html;
  export let name = 'viewer';
  let ready = false;
  let libraries;

  //iframe vars
  let message = '';
  let proxy = null;
  let last_console_event;

  async function applyBundle(bundle) {
    if (!bundle || bundle.error) return;
    try {
      await proxy.eval(`
                       ${$injectedJS}
                       ${libraries}
                       ${styles}
                       document.body.innerHTML = '';
                       ${$bundledCode}
                       `)
    } catch (e) {
      console.error(e)
    }
  }

  const setReady = () => {
    ready = true;
  }
  onMount(() => {
    proxy = new ReplProxy(iframe, {
      on_fetch_progress: progress => {
        pending_imports = progress;
      },
      on_error: event => {
        push_logs({ level: 'error', args: [event.value]});
      },
      on_unhandled_rejection: event => {
        let error = event.value;
        if (typeof error === 'string') error = { message: error };
        error.message = 'Uncaught (in promise): ' + error.message;
        push_logs({ level: 'error', args: [error]});
      },
      on_console: log => {
        if (log.level === 'clear') {
          logs.set([log]);
        } else if (log.duplicate) {
          const last_log = logs[logs.length - 1];
          if (last_log) {
            last_log.count = (last_log.count || 1) + 1;
            logs.set(logs);
          } else {
            last_console_event.count = 1;
            logs.set([last_console_event]);
          }
        } else {
          push_logs(log);
          last_console_event = log;
        }
      }
    });
    iframe.addEventListener('load', setReady);
    return () => {
      proxy.destroy();
    }
  });
  onDestroy(() => {
    iframeReady.setReady(false, name)
    iframe.removeEventListener('load', setReady);
  });

  $: if(ready) applyBundle($bundle)

    $: styles = injectedCSS && `
      const style = document.createElement('style');
      style.textContent = ${JSON.stringify(injectedCSS)};
      document.head.appendChild(style);
    `;
    $: if($injectedLibraries.length > 0) {
      libraries = $injectedLibraries.map((lib) => {
        return `
        const script = document.createElement('script');
        script.type= 'text/javascript';
        script.src = '${lib}';
        document.head.appendChild(script);
        `
      }).join('\n')
    }
    function handleResize() {
      applyBunde($bundle);
    }
    function push_logs(log) {
      logs.set([...$logs, log]);
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

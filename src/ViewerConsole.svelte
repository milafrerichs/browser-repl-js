<script>
  import Viewer from './Viewer.svelte';
  import Console from './Console.svelte';

  import { code } from './stores.js'

  export let cssStyles;
  export let width = 0;
  export let height = 0;
  let iframeComtainerWidth;
  let iframeComtainerHeight;

  let tab = 'viewer';

  function showConsole() {
    tab = 'console';
  }
  function showResult() {
    tab = 'viewer';
  }
</script>

<div class="{cssStyles.viewerContainer}">
  <div class="{cssStyles.viewerActions.container}">
    <div class="{cssStyles.viewerActions.tabItem}">
      <a class:active="{tab == 'viewer'}" class="{cssStyles.viewerActions.link}" on:click="{() => showResult()}">Result</a>
    </div>
    <div class="{cssStyles.viewerActions.tabItem}">
      <a class:active="{tab == 'console'}" class="{cssStyles.viewerActions.link}" on:click="{() => showConsole()}">Console</a>
    </div>
  </div>
  <div class="{cssStyles.viewerConsoleContainer}" bind:clientWidth={iframeComtainerWidth} bind:clientHeight={iframeComtainerHeight} >
    <div class:hidden="{tab != 'viewer'}" class="{cssStyles.viewer}" >
      <Viewer width={iframeComtainerWidth} height={iframeComtainerHeight} />
    </div>
    <div class:hidden="{tab != 'console'}" class="{cssStyles.console}" >
      <Console width={iframeComtainerWidth} height={iframeComtainerHeight} />
    </div>
  </div>
</div>

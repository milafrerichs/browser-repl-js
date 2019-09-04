<script>
  import Viewer from './Viewer.svelte';
  import Console from './Console.svelte';

  import { tab } from './stores.js';

  const unsubscribe_tab = tab.subscribe(value => {
    tab_value = value;
  });

</script>

<div class="{cssStyles.viewerConsoleContainer}">
  <div class:hidden="{tab_value != 'viewer'}" class="{cssStyles.viewer}">
    <Viewer />
  </div>
  <div class:hidden="{tab_value != 'console'}" class="{cssStyles.console}">
    <Console />
  </div>
</div>

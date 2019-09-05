<script>
  import Result from './Result.svelte';

  import { code, html } from './stores.js'

</script>

<Result code={$code} html={$html} />

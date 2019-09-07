<script>
  import Result from './Result.svelte';

  import { code, html } from './stores.js'
  export let width;
  export let height;

</script>

<Result {width} {height} code={$code} html={$html} />

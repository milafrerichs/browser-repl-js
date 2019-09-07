<script>
  export let cssStyles;
  let width;
  let height;
</script>

<div class="{cssStyles.container}" >
  <div class="{cssStyles.viewerContainer}">
    <div class="{cssStyles.viewerConsoleContainer}" bind:clientWidth={width} bind:clientHeight={height} >
      <slot {width} {height} name="viewer"></slot>
    </div>
  </div>
  <div class="result-container {cssStyles.resultContainer}">
    <slot name="editor">
    </slot>
  </div>
</div>

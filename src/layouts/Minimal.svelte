<script>
  export let cssStyles;
</script>

<div class="{cssStyles.container}" >
  <div class="result-container {cssStyles.resultContainer}">
    <slot name="editor">
    </slot>
  </div>
  <div class="{cssStyles.viewerContainer}">
    <div class="{cssStyles.viewerConsoleContainer}">
      <slot name="viewer"></slot>
    </div>
  </div>
</div>

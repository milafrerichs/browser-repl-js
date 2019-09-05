<script>
  export let cssStyles;
  export let showEditor;
  export let tab;
</script>

<div class="{cssStyles.container}" >
  <div class="{cssStyles.viewerContainer}">
    <div class="{cssStyles.viewerConsoleContainer}">
      <slot name="viewer"></slot>
    </div>
  </div>
  <div class="result-container {cssStyles.resultContainer}">
    <slot name="editor">
    </slot>
  </div>
</div>

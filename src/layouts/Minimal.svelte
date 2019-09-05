<script>
  export let cssStyles;
  export let showEditor;
  export let tab;
</script>

<div class="{cssStyles.container}" >
  <div class="result-container {cssStyles.resultContainer}">
    <slot name="editor">
    </slot>
  </div>
  <div class:view-only="{!showEditor}" class="{cssStyles.viewerContainer}">
    <div class="{cssStyles.viewerConsoleContainer}">
      <div class:hidden="{tab != 'viewer'}" class="{cssStyles.viewer}">
        <slot name="viewer"></slot>
      </div>
    </div>
  </div>
</div>

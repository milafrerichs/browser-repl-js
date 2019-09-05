<script>
  import {
    files,
    currentFileIndex
  } from './../stores.js'

  export let cssStyles;

  function showFile(fileIndex) {
    currentFileIndex.set(fileIndex);
  }
</script>

<div class="{cssStyles.container}" >
  <div class="result-container {cssStyles.resultContainer}">
    <div class="{cssStyles.editor}">
      <div class="{cssStyles.editorActions.container}">
        {#each $files as { name }, i}
          <div class="{cssStyles.editorActions.tabItem}">
            <a class:active="{$currentFileIndex == i}" class="{cssStyles.editorActions.link}" on:click="{() => showFile(i)}">{name}</a>
          </div>
        {/each}
      </div>
      <slot name="editor"></slot>
    </div>
    <slot name="viewer-console"></slot>
  </div>
</div>

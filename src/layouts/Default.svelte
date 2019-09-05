<script>
  import {
    files,
    currentFileIndex 
  } from './../stores.js'

  export let cssStyles;

  //maybe add the file change here
  function showFile(fileIndex) {
    //currentFile.content = currentContent;
    currentFileIndex.set(fileIndex);
  }
</script>

<style>
  .hidden {
    visibility: hidden;
  }
  .content-container {
    transition-property: all;
    transition-duration: .5s;
    transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  }
  .hide-content .content-container{
    max-width: 0;
    overflow-x: hidden;
  }
  .hide-content .result-container {
    width: 95%;
  }
</style>

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
        <slot name="editor">
        </slot>
      </div>
    <slot name="viewer-console"></slot>
  </div>
</div>

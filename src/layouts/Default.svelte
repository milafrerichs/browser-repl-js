<script>
  export let cssStyles;
  export let showEditor;
  export let tab;
  export let files;

  //maybe add the file change here
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
    {#if showEditor}
      <div class:hidden="{!showEditor}" class="{cssStyles.editor}">
        {#if showFiles}
          <div class="{cssStyles.editorActions.container}">
            {#each files as { name }, i}
              <div class="{cssStyles.editorActions.tabItem}">
                <a class:active="{currentFileIndex == i}" class="{cssStyles.editorActions.link}" on:click="{() => showFile(i)}">{name}</a>
              </div>
            {/each}
          </div>
        {/if}
        <slot name="editor">
        </slot>
      </div>
    {/if}
    <div class:view-only="{!showEditor}" class="{cssStyles.viewerContainer}">
      {#if showTabs}
        <div class="{cssStyles.viewerActions.container}">
          <div class="{cssStyles.viewerActions.tabItem}">
            <a class:active="{tab == 'viewer'}" class="{cssStyles.viewerActions.link}" on:click="{() => showResult()}">Result</a>
          </div>
          <div class="{cssStyles.viewerActions.tabItem}">
            <a class:active="{tab == 'console'}" class="{cssStyles.viewerActions.link}" on:click="{() => showConsole()}">Console</a>
          </div>
        </div>
    {/if}
      <div class="{cssStyles.viewerConsoleContainer}">
        <div class:hidden="{tab != 'viewer'}" class="{cssStyles.viewer}">
          <slot name="viewer"></slot>
        </div>
        <div class:hidden="{tab != 'console'}" class="{cssStyles.console}">
          <slot name="console"></slot>
        </div>
      </div>
    </div>
  </div>
</div>

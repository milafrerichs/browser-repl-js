<style>
  :global(.tutorial-container) {
    width: 100%;
    height: 100%;
    display: flex;
  }
  :global(.content-container) {
    width: 35%;
  }
  :global(.result-container) {
    width: 65%;
  }
  :global(.viewer-container) {
    height: 50%;
  }
  :global(.viewer-console-container) {
  }
  :global(.viewer-action-container) {
  }
  :global(.viewer) {
  }
  :global(.editor){
    height: 50%;
  }
  :global(.actions){
  }
  :global(.hidden){
    display: none;
  }
</style>
<script>
	import Tutorials from '../src/Tutorials.svelte';
	let chapters = [
		{
      title: 'Entry',
			content: 'Test',
      code: 'document.body.innerHTML = "Test";',
      solution: 'document.body.innerHTML = "Solution";',
      viewOnly: true
		},
		{
      title: '1: Test',
			content: 'Test 2',
      code: 'document.body.innerHTML = "Test 2";',
      solution: 'document.body.innerHTML = "Solution 2";console.log("Test")'
		}
	]
  let cssStyles = {
    container: 'tutorial-container',
    contentContainer: 'content-container',
    resultContainer: 'result-container',
		viewerContainer: 'viewer-container',
		viewerConsoleContainer: 'viewer-console-container',
		viewerActions: {
			container: 'viewer-action-container',
			tabItem: 'tab-item',
			link: 'tab-link'
		},
    viewer: 'viewer',
    console: 'console',
    editor: 'editor',
    actions: 'actions',
    button: {
			default: 'btn',
			show: 'show',
			next: 'next',
			prev: 'prev'
    }
  }

</script>

<Tutorials {cssStyles} {chapters} />


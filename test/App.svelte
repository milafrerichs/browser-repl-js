
<script>
	import Tutorials from '../src/Tutorials.svelte';
	let chapters = [
		{
			content: 'Test',
      code: 'document.body.innerHTML = "Test";',
      solution: 'document.body.innerHTML = "Solution";'
		},
		{
			content: 'Test 2',
      code: 'document.body.innerHTML = "Test 2";',
      solution: 'document.body.innerHTML = "Solution 2";console.log("Test")'
		}
	]
  let cssStyles = {
    container: "container",
    button: {
      default: 'bla'
    }
  }
</script>

<Tutorials {cssStyles} {chapters} />


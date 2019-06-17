
<script>
	import Tutorials from '../src/Tutorials.svelte';
	let chapters = [
		{
			content: 'Test',
			code: 'test',
			solution: 'test'
		},
		{
			content: 'Test 2'
		}
	]
</script>

<Tutorials chapters={chapters} />


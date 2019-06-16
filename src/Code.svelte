<script>
	import { createEventDispatcher } from 'svelte';
	export let code = '';
	const dispatch = createEventDispatcher();
	const submit = () => dispatch('submit');
</script>

<input bind:value="{code}">
<button on:click={submit}>Evaluate</button>

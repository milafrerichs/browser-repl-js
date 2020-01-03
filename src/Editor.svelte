<script>
  import { getContext, onMount } from 'svelte';
  import CodeMirror from './CodeMirror.svelte';

  const { handleChange, registerEditor } = getContext('REPL');

  let editor;
	onMount(() => {
		registerEditor(editor);
	});

  let debounceTime = 300;
  const debounce = (func, delay) => {
    let inDebounce
    return function() {
      const context = this
      const args = arguments
      clearTimeout(inDebounce)
      inDebounce = setTimeout(() =>
        func.apply(context, args)
      , delay)
    }
  }

  const debounceChangeCode = debounce(changeCode, debounceTime);

  function changeCode(event) {
    handleChange(event.detail.value);
  }
</script>

<CodeMirror
  bind:this={editor}
  on:change={debounceChangeCode}
/>

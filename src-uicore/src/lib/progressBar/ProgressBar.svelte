<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		value,
		indeterminate = false,
		...others
	}: HTMLAttributes<HTMLDivElement> & {
		value?: number;
		indeterminate?: boolean;
	} = $props();
</script>

<div
	class="progress-bar {others.class}"
	class:progress-bar-indeterminate={indeterminate}
	{...others}
>
	<div style={indeterminate ? '' : `width: ${value}%;`}></div>
</div>

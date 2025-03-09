<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { ProgressBar } from '../progressBar/index.js';

	let {
		value,
		...others
	}: HTMLAttributes<HTMLDivElement> & {
		value: number;
	} = $props();
</script>

<ProgressBar
	class="meter {value > 0.66
		? 'bg-accent'
		: value > 0.33
			? 'bg-warning'
			: 'bg-danger'} {others.class}"
	{...others}
/>

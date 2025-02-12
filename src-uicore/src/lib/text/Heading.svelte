<script lang="ts">
	import type { Snippet } from 'svelte';
	import './heading.css';
	const {
		level = 1,
		children,
		class: classes
	}: {
		level?: 1 | 2 | 3 | 4 | 5 | 6;
		class?: string;
		children?: Snippet<[]>;
	} = $props();
</script>

<svelte:element this={`h${level}`} class="text heading {classes}">
	{@render children?.()}
</svelte:element>

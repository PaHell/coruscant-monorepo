<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	const {
		level = 1,
		children,
		...others
	}: HTMLAttributes<HTMLHeadingElement> & {
		level?: 1 | 2 | 3 | 4 | 5 | 6;
		class?: string;
		children: Snippet<[]>;
	} = $props();
</script>

<svelte:element this={`h${level}`} {...others} class="text heading heading-{level} {others.class}">
	{@render children()}
</svelte:element>

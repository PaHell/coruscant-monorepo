<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Properties = {
		level?: 1 | 2 | 3 | 4 | 5 | 6;
		class?: string;
		children: Snippet<[]>;
	} & Omit<HTMLAttributes<HTMLHeadingElement>, 'children'>;

	const { level = 1, children, ...others }: Properties = $props();
</script>

<svelte:element this={`h${level}`} {...others} class="text heading heading-{level} {others.class}">
	{@render children()}
</svelte:element>

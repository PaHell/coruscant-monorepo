<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	const {
		small = false,
		secondary = false,
		children,
		...others
	}: HTMLAttributes<HTMLParagraphElement> & {
		small?: boolean;
		secondary?: boolean;
		class?: string;
		children: Snippet<[]>;
	} = $props();
</script>

<p {...others} class="text {others.class}" class:small class:secondary>
	{@render children()}
</p>

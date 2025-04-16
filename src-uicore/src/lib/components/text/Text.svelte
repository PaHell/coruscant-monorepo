<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Properties = {
		small?: boolean;
		secondary?: boolean;
		class?: string;
		children: Snippet<[]>;
	} & Omit<HTMLAttributes<HTMLParagraphElement>, 'children'>;
	const { small = false, secondary = false, children, ...others }: Properties = $props();
</script>

<p {...others} class="text {others.class}" class:small class:secondary>
	{@render children()}
</p>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import './text.css';
	const {
		small = false,
		secondary = false,
		class: classes,
		children
	}: {
		small?: boolean;
		secondary?: boolean;
		class?: string;
		children: Snippet<[]>;
	} = $props();
</script>

<p class="text {classes}" class:small class:secondary>
	{@render children()}
</p>

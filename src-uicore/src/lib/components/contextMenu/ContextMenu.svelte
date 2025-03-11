<script lang="ts">
	import { Button } from '$lib/index.js';
	import { Floating } from '$lib/index.js';
	import { icons } from '$lib/index.js';
	import type { Snippet } from 'svelte';

	let {
		children
	}: {
		children: Snippet<[]>;
	} = $props();
</script>

<Floating placement="bottom-start" strategy="fixed" class="context-menu">
	{#snippet trigger({ toggle })}
		<Button
			variant="integrated"
			icon={icons.controls.dropdown}
			label="Menu"
			onclick={toggle}
			class="context-menu-button"
			hideLabel
		/>
	{/snippet}
	{#snippet menu()}
		{@render children()}
	{/snippet}
</Floating>

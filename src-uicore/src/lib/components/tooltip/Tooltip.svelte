<script lang="ts">
	import { Floating } from '$lib/index.js';
	import { Text } from '$lib/index.js';
	import type { Snippet } from 'svelte';

	let {
		value,
		trigger: _trigger
	}: {
		value: string;
		trigger: Snippet<
			[
				{
					open: () => void;
					close: () => void;
					toggle: () => void;
				}
			]
		>;
	} = $props();

	let hidden = $state(true);
</script>

<Floating
	placement="bottom-start"
	strategy="fixed"
	{hidden}
	class="tooltip-menu"
	onmouseenter={() => (hidden = false)}
	onmouseleave={() => (hidden = true)}
	trigger={_trigger}
>
	{#snippet menu()}
		<Text>{value}</Text>
	{/snippet}
</Floating>

<script lang="ts">
	import { Text, type BaseBadgeProperties } from '$lib/index.js';
	import type { HTMLAttributes } from 'svelte/elements';

	type Properties = BaseBadgeProperties & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

	let { label, color, variant, pill = false, onRemove, ...others }: Properties = $props();
</script>

<div
	{...others}
	class="badge badge-color-{color} badge-variant-{variant} {others.class}"
	class:badge-pill={pill}
>
	<Text>{label}</Text>
	{#if onRemove}
		<button aria-label="Close" onclick={onRemove}>
			<svg viewBox="0 0 14 14">
				<path d="M4 4l6 6m0-6l-6 6" />
			</svg>
		</button>
	{/if}
</div>

<script lang="ts">
	import { type Snippet } from 'svelte';
	import { Text, icons, Button, type ButtonProperties, Icon } from '$lib/index.js';

	let {
		label,
		color,
		variant,
		pill = false,
		onRemove,
		...others
	}: {
		label: string;
		color?: 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple' | 'pink';
		variant?: 'dot' | 'flat' | 'border';
		pill?: boolean;
		onRemove?: (event: MouseEvent) => void;
	} = $props();
</script>

<div class="badge badge-color-{color} badge-variant-{variant}" class:badge-pill={pill} {...others}>
	<Text>{label}</Text>
	<button aria-label="Close" onclick={onRemove}>
		<svg viewBox="0 0 14 14">
			<path d="M4 4l6 6m0-6l-6 6" />
		</svg>
	</button>
</div>

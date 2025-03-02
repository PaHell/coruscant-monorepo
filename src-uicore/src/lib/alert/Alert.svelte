<script lang="ts">
	import { type Snippet } from 'svelte';
	import { Text } from '../text/index.js';
	import { Icon } from '../icon/index.js';
	import './style.css';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		icon,
		variant = 'primary',
		children,
		...others
	}: HTMLAttributes<HTMLDivElement> & {
		icon?: string;
		variant?: 'primary' | 'warning' | 'danger';
		children: Snippet<[]>;
	} = $props();
</script>

<div class="alert alert-variant-{variant} {others.class}" {...others}>
	{#if icon}
		<Icon name={icon} />
	{/if}
	<Text>{@render children()}</Text>
</div>

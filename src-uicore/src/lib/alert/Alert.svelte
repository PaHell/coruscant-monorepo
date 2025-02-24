<script lang="ts">
	import { type Snippet } from 'svelte';
	import { Text } from '../text/index.js';
	import { Icon } from '../icon/index.js';
	import './style.css';
	import type { HTMLBaseAttributes } from 'svelte/elements';

	let {
		icon,
		variant = 'primary',
		children,
		...others
	}: HTMLBaseAttributes & {
		icon?: string;
		variant?: 'primary' | 'warning' | 'danger';
		children: Snippet<[]>;
	} = $props();
</script>

<div id={others.id} class="alert alert-variant-{variant} {others.class}">
	{#if icon}
		<Icon name={icon} />
	{/if}
	<Text>{@render children()}</Text>
</div>

<script lang="ts">
	import { Icon, type ButtonProperties } from '$lib/index.js';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Properties = ButtonProperties & Omit<HTMLButtonAttributes, 'children'>;
	let {
		icon,
		hideValue = false,
		variant = 'primary',
		size = 'md',
		active = false,
		children,
		...others
	}: Properties = $props();
</script>

<button
	{...others}
	class="button button-size-{size} button-variant-{variant} {active
		? 'button-active'
		: ''} {others.class}"
>
	{#if children}
		{@render children()}
	{:else}
		{#if icon}
			<Icon name={icon} {size} />
		{/if}
		{#if !hideValue}
			<span>{others.value}</span>
		{/if}
	{/if}
</button>

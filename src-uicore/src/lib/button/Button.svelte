<script lang="ts">
	import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';
	import { Icon, type ButtonProperties } from '$lib/index.js';

	let {
		icon,
		href,
		label,
		hideLabel = false,
		variant = 'primary',
		size = 'default',
		active = false,
		children,
		...others
	}: ButtonProperties & HTMLButtonAttributes & HTMLAnchorAttributes = $props();
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	{...others}
	class="button button-size-{size} button-variant-{variant} {active
		? 'button-active'
		: ''} {others.class}"
	type="button"
>
	{#if children}
		{@render children()}
	{:else}
		{#if icon}
			<Icon name={icon} />
		{/if}
		{#if !hideLabel}
			<span>{label}</span>
		{/if}
	{/if}
</svelte:element>

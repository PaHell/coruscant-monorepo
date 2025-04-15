<script lang="ts">
	import { Icon, type ButtonProperties } from '$lib/index.js';
	import type { DOMAttributes, HTMLAnchorAttributes } from 'svelte/elements';

	let {
		icon,
		label,
		hideLabel = false,
		variant = 'primary',
		size = 'md',
		active = false,
		children,
		...others
	}: ButtonProperties & DOMAttributes<HTMLAnchorElement | HTMLButtonElement> = $props();
</script>

<svelte:element
	this={Object.hasOwn(others, 'href') ? 'a' : 'button'}
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
		{#if !hideLabel}
			<span>{label}</span>
		{/if}
	{/if}
</svelte:element>

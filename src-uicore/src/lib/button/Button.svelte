<script lang="ts">
	import './style.css';
	import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';
	import Icon from '$lib/icon/Icon.svelte';
	import type { ButtonProperties } from './index.js';

	let {
		icon,
		href,
		label,
		hideLabel = false,
		variant = 'primary',
		size = 'default',
		active = false,
		class: classes,
		children,
		...others
	}: ButtonProperties & HTMLButtonAttributes & HTMLAnchorAttributes = $props();
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	class="button button-size-{size} button-variant-{variant} {active
		? 'button-active'
		: ''} {classes}"
	type="button"
	{...others}
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

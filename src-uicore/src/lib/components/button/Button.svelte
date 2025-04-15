<script lang="ts">
	import { Icon, type ButtonProperties } from '$lib/index.js';
	import type { MergeWithUnion } from '$lib/utils/types.js';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type A = ButtonProperties;
	type B = MergeWithUnion<A, HTMLButtonAttributes>;
	type C = MergeWithUnion<B, HTMLAnchorAttributes>;

	let {
		icon,
		label,
		hideLabel = false,
		variant = 'primary',
		size = 'md',
		active = false,
		children,
		...others
	}: C = $props();
</script>

<svelte:element
	this={others.href ? 'a' : 'button'}
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

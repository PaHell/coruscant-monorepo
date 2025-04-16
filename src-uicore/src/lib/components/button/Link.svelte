<script lang="ts">
	import { Icon, type ButtonProperties } from '$lib/index.js';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	type Properties = ButtonProperties & { value: string } & Omit<HTMLAnchorAttributes, 'children'>;
	let {
		icon,
		value,
		hideValue = false,
		variant = 'primary',
		size = 'md',
		active = false,
		children,
		...others
	}: Properties = $props();
</script>

<a
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
			<span>{value}</span>
		{/if}
	{/if}
</a>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes, HTMLTextareaAttributes } from 'svelte/elements';
	import { Icon } from '$lib/index.js';

	type T = $$Generic;
	let {
		id = Math.random().toString(36).substring(7),
		value = $bindable(''),
		label,
		icon,
		isTextarea = false,
		onchange,
		oninput,
		children,
		...others
	}: HTMLInputAttributes &
		HTMLTextareaAttributes & {
			label?: string;
			icon?: string;
			isTextarea?: boolean;
			children?: Snippet<[]>;
		} = $props();

	function input(event: Event) {
		const target = event.target as HTMLInputElement | HTMLTextAreaElement;
		value = target.value;
		oninput?.(event);
	}

	function change(event: Event) {
		const target = event.target as HTMLInputElement | HTMLTextAreaElement;
		value = target.value;
		onchange?.(event);
	}
</script>

<div class="input {others.class}">
	{#if icon}
		<Icon name={icon} />
	{/if}
	<div>
		{#if label}
			<label for={id} class="text small">
				{label}
				{#if others.required}
					<span class="text-danger">*</span>
				{/if}
			</label>
		{/if}
		<svelte:element
			this={isTextarea ? 'textarea' : 'input'}
			{id}
			{value}
			oninput={input}
			onchange={change}
			{...others}
		></svelte:element>
	</div>
	{@render children?.()}
</div>

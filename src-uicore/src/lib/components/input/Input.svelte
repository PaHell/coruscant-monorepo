<script lang="ts">
	import { getContext, type Snippet } from 'svelte';
	import type { HTMLInputAttributes, HTMLTextareaAttributes } from 'svelte/elements';
	import { type FormContext, FormContextKey, type FormField, Icon, icons } from '$lib/index.js';
	import Text from '../text/Text.svelte';

	type T = $$Generic;
	let {
		id = Math.random().toString(36).substring(7),
		value = $bindable(''),
		name = id,
		label,
		prefix,
		suffix,
		icon,
		size = 'md',
		isTextarea = false,
		onchange,
		oninput,
		before,
		after,
		...others
	}: HTMLInputAttributes &
		HTMLTextareaAttributes & {
			label?: string;
			prefix?: string;
			suffix?: string;
			icon?: string;
			size?: 'sm' | 'md' | 'lg';
			isTextarea?: boolean;
			before?: Snippet<[]>;
			after?: Snippet<[]>;
		} = $props();

	const context = getContext<FormContext>(FormContextKey);

	if (context) {
		context.set(name!, {
			value,
			valid: true
		} satisfies FormField);
	}

	function input(event: Event) {
		const target = event.target as HTMLInputElement | HTMLTextAreaElement;
		value = target.value;
		oninput?.(event);
	}

	function change(event: Event) {
		const target = event.target as HTMLInputElement | HTMLTextAreaElement;
		value = target.value;
		onchange?.(event);
		context?.set(name!, {
			value,
			valid: true
		} satisfies FormField);
	}
</script>

<div class="input input-size-{size} {others.class}">
	{@render before?.()}
	{#if icon}
		<Icon name={icon} {size} />
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
		<div>
			{#if prefix}
				<Text>{prefix}</Text>
			{/if}
			<svelte:element
				this={isTextarea ? 'textarea' : 'input'}
				{id}
				{name}
				{value}
				oninput={input}
				onchange={change}
				{...others}
			></svelte:element>
			{#if suffix}
				<Text>{suffix}</Text>
			{/if}
		</div>
	</div>
	{@render after?.()}
</div>

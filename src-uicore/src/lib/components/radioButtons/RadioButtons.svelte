<script lang="ts">
	import { Button, FormContextKey, Text, type FormContext } from '$lib/index.js';
	import { getContext, type Snippet } from 'svelte';

	type T = $$Generic;
	type TValue = $$Generic;
	let {
		title,
		subtitle,
		formName,
		variant = 'vertical',
		items = $bindable([]),
		value = $bindable(undefined),
		getValue = (item: T) => item as unknown as TValue,
		textNone = 'None',
		allowNone = false,
		onchange,
		children
	}: {
		title: string;
		subtitle?: string;
		formName: string;
		variant?: 'vertical' | 'horizontal' | 'sections' | 'cards' | 'buttons' | 'stacked-cards';
		items: T[];
		value: TValue | undefined;
		getValue?: (item: T) => TValue;
		textNone?: string;
		allowNone?: boolean;
		onchange?: (item: T | undefined, index: number) => unknown;
		children?: Snippet<[T]>;
	} = $props();

	$effect(internalOnChange);

	const context = getContext<FormContext>(FormContextKey);

	if (context) {
		context.set(formName, {
			value,
			valid: true
		});
	}

	function setValue(newValue?: T) {
		value = newValue ? getValue(newValue) : undefined;
		internalOnChange();
		context?.set(formName, {
			value,
			valid: true
		});
	}

	function internalOnChange() {
		const index = items.findIndex((item) => getValue(item) === value);
		onchange?.(items[index], index);
	}
</script>

<fieldset class="radio-buttons radio-buttons-variant-{variant}">
	<div>
		<legend>{title}</legend>
		{#if subtitle}
			<Text small secondary>{subtitle}</Text>
		{/if}
	</div>
	<div>
		{#if allowNone}
			<div>
				<input id="{formName}-item-none" name={formName} type="radio" checked={!value} />
				<label for="{formName}-item-none">{textNone}</label>
			</div>
		{/if}
		{#each items as item (getValue(item))}
			<div>
				<input
					id="{formName}-item-{getValue(item)}"
					name={formName}
					type="radio"
					value={getValue(item)}
					checked={value === getValue(item)}
					onchange={() => setValue(item)}
				/>
				<label for="{formName}-item-{getValue(item)}">
					{#if children}
						{@render children(item)}
					{:else}
						{item}
					{/if}
				</label>
			</div>
		{/each}
	</div>
</fieldset>

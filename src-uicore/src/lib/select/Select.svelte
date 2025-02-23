<script lang="ts">
	import './style.css';
	import { Button } from '../button/index.js';
	import { Floating } from '../floating/index.js';
	import { Icon, icons } from '../icon/index.js';

	type T = $$Generic;
	type TKey = $$Generic;
	let {
		items = $bindable([]),
		value = $bindable(undefined),
		getKey = (item: T) => item as unknown as TKey,
		getDisplayValue = (item: T) => item as unknown as string,
		placeholder = 'Placeholder',
		allowNone = false,
		onchange
	}: {
		items: T[];
		value: T | undefined;
		getKey?: (item: T) => TKey;
		getDisplayValue: (item: T) => string;
		placeholder?: string;
		allowNone?: boolean;
		onchange?: (item: T | undefined, index: number) => unknown;
	} = $props();

	$effect(internalOnChange);

	function setValue(newValue?: T) {
		value = newValue;
		console.log({ value });
		internalOnChange();
	}

	function internalOnChange() {
		const key = value ? getKey(value) : undefined;
		const index = items.findIndex((item) => getKey(item) === key);
		onchange?.(value, index);
	}
</script>

<Floating placement="bottom-start" strategy="fixed" class="!p-0">
	{#snippet trigger({ toggle })}
		<Button
			variant="form"
			label={value ? getDisplayValue(value) : placeholder}
			onclick={toggle}
			class="select-button"
		>
			{#snippet children()}
				<span class="me-auto" class:text-secondary={!value}
					>{value ? getDisplayValue(value) : placeholder}</span
				>
				<Icon name={icons.controls.dropdown} />
			{/snippet}
		</Button>
	{/snippet}
	{#snippet menu()}
		<div class="select-menu">
			{#if allowNone}
				<Button
					variant="integrated"
					label={placeholder}
					onclick={() => setValue()}
					class="w-full !rounded-none"
				/>
			{/if}
			{#each items as item, i (i)}
				<Button
					variant="integrated"
					label={getDisplayValue(item)}
					onclick={() => setValue(item)}
					class="w-full !rounded-none"
					active={(value && getKey(value)) == getKey(item)}
				/>
			{/each}
		</div>
	{/snippet}
</Floating>

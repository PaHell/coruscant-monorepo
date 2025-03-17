<script lang="ts">
	import { Button } from '$lib/index.js';
	import { Floating } from '$lib/index.js';
	import { Icon, icons } from '$lib/index.js';
	import type { Snippet } from 'svelte';

	type T = $$Generic;
	type TKey = $$Generic;
	let {
		items = $bindable([]),
		value = $bindable(),
		getKey = (item: NonNullable<T>) => item as unknown as TKey,
		getDisplayValue = (item: NonNullable<T>) => item as unknown as string,
		placeholder = 'Placeholder',
		allowNone = false,
		onchange,
		item
	}: {
		items: NonNullable<T>[];
		value: NonNullable<T> | null;
		getKey?: (item: NonNullable<T>) => TKey;
		getDisplayValue: (item: NonNullable<T>) => string;
		placeholder?: string;
		allowNone?: boolean;
		useUndefined?: boolean;
		onchange?: (item: NonNullable<T> | null, index: number) => unknown;
		item?: Snippet<
			[
				{
					item: T;
					index: number;
					active: boolean;
				}
			]
		>;
	} = $props();

	$effect(internalOnChange);

	function setValue(newValue?: T) {
		value = newValue ?? null;
		console.log({ value });
		internalOnChange();
	}

	function internalOnChange() {
		const key = value ? getKey(value) : undefined;
		const index = items.findIndex((item) => getKey(item) === key);
		onchange?.(value, index);
	}
</script>

<Floating placement="bottom-start" strategy="fixed" class="select-menu">
	{#snippet trigger({ toggle })}
		<Button
			variant="secondary"
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
		{#if allowNone}
			<Button
				variant="integrated"
				label={placeholder}
				onclick={() => setValue()}
				class="w-full !rounded-none"
			/>
		{/if}
		{#if item}
			{#each items as _item, i (i)}
				<Button
					variant="integrated"
					label={getDisplayValue(_item)}
					onclick={() => setValue(_item)}
					class="w-full !rounded-none"
					active={(value && getKey(value)) == getKey(_item)}
				>
					{@render item?.({
						item: _item,
						index: i,
						active: (value && getKey(value)) == getKey(_item)
					})}
				</Button>
			{/each}
		{:else}
			{#each items as _item, i (i)}
				<Button
					variant="integrated"
					label={getDisplayValue(_item)}
					onclick={() => setValue(_item)}
					class="w-full !rounded-none"
					active={(value && getKey(value)) == getKey(_item)}
				>
					<span class="flex-1 text-left">{getDisplayValue(_item)}</span>
					{#if (value && getKey(value)) == getKey(_item)}
						<Icon name={icons.controls.checkmark} />
					{/if}
				</Button>
			{/each}
		{/if}
	{/snippet}
</Floating>

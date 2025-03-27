<script lang="ts">
	import { Select } from './index.js';

	type T = $$Generic;
	type TKey = $$Generic<string | number>;

	let {
		name,
		items = $bindable([]),
		value = $bindable(),
		key = 'id' as keyof NonNullable<T>,
		getDisplayValue = (item: NonNullable<T>) => item as unknown as string,
		placeholder,
		allowNone,
		onchange
	}: {
		name?: string;
		items: NonNullable<T>[];
		value: NonNullable<T>[keyof NonNullable<T>] | null;
		key?: keyof NonNullable<T>;
		getDisplayValue: (item: NonNullable<T>) => string;
		placeholder?: string;
		allowNone?: boolean;
		onchange?: (item: NonNullable<T> | null, index: number) => unknown;
	} = $props();

	let internalValue = $derived(items.find((e) => e[key] === value) ?? null);
</script>

<Select
	{name}
	{items}
	value={internalValue}
	getKey={(i) => i[key]}
	{getDisplayValue}
	{placeholder}
	{allowNone}
	onchange={(val, idx) => {
		value = val ? val[key] : null;
		onchange?.(val, idx);
	}}
/>

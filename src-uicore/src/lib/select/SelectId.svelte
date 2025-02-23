<script lang="ts">
	import { Select } from './index.js';

	type T = $$Generic;
	type TKey = $$Generic<string | number>;

	let {
		items = $bindable([]),
		value = $bindable(),
		key = 'id' as keyof T,
		getDisplayValue = (item: T) => item as unknown as string,
		placeholder,
		allowNone,
		onchange
	}: {
		items: T[];
		value: TKey;
		key?: keyof T;
		getDisplayValue: (item: T) => string;
		placeholder?: string;
		allowNone?: boolean;
		onchange?: (item: T) => unknown;
	} = $props();

	let internalValue = $derived(items.find((e) => e[key] === value));
</script>

<Select
	{items}
	value={internalValue}
	getKey={(i) => i[key]}
	{getDisplayValue}
	{placeholder}
	{allowNone}
	onchange={(val) => {
		value = val ? val[key] : undefined;
		onchange?.(val);
	}}
/>

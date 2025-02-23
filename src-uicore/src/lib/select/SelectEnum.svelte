<script lang="ts">
	import { Select } from './index.js';

	type T = $$Generic<string | number>;
	type EnumEntry = [string, T];
	let {
		entries = $bindable([]),
		value = $bindable(),
		getDisplayValue = (item: EnumEntry) => item as unknown as string,
		placeholder,
		onchange
	}: {
		entries: EnumEntry[];
		value: T;
		getDisplayValue: (item: EnumEntry) => string;
		placeholder?: string;
		onchange?: (item: EnumEntry) => unknown;
	} = $props();

	const enumValues = Object.values(entries);
	const half = Math.ceil(enumValues.length / 2);
	const items: EnumEntry[] = entries.slice(half);

	let internalValue = $derived(entries.find((e) => e[1] === value));
</script>

<Select
	{items}
	value={internalValue}
	getKey={(i) => i[1]}
	{getDisplayValue}
	{placeholder}
	onchange={(val) => {
		value = val ? val[1] : undefined;
		onchange?.(val);
	}}
/>

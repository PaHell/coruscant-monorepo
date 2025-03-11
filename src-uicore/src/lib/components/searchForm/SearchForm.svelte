<script lang="ts">
	import { Input } from '$lib/index.js';
	import { Floating } from '$lib/index.js';
	import { Button } from '$lib/index.js';

	type T = $$Generic;
	type TKey = $$Generic<string | number>;
	type TNone = $$Generic<null | undefined>;
	let {
		value = $bindable(),
		items,
		getDisplayValue,
		getKey,
		hidden = $bindable(true),
		label,
		icon,
		onsearch
	}: {
		value: TKey | TNone;
		items: T[];
		getDisplayValue: (item: T) => string;
		getKey: (item: T) => TKey;
		hidden?: boolean;
		label?: string;
		icon?: string;
		onsearch?: (term: string, value: T) => number;
		onchange?: (value: T) => unknown;
	} = $props();

	let searchValue = $state('');
	let filteredItems = $derived(
		items
			.map<[T, number]>((item) => [
				item,
				onsearch
					? onsearch(searchValue, item)
					: +getDisplayValue(item).toLowerCase().includes(searchValue.toLowerCase())
			])
			.filter(([, score]) => score)
			.sort(([, a], [, b]) => b - a)
			.map(([item]) => item)
	);

	function setValue(item: T) {
		value = getKey(item);
		searchValue = getDisplayValue(item);
		hidden = true;
	}
</script>

<Floating bind:hidden placement="bottom-start" strategy="fixed" class="search-form-menu">
	{#snippet trigger({ open, close })}
		<Input
			{label}
			{icon}
			bind:value={searchValue}
			onfocus={open}
			onblur={close}
			class="search-form-input"
		/>
	{/snippet}
	{#snippet menu()}
		{#each filteredItems as item, i (i)}
			<Button
				variant="integrated"
				label={getDisplayValue(item)}
				onclick={() => setValue(item)}
				class="w-full !rounded-none"
				active={getKey(item) === value}
			/>
		{/each}
	{/snippet}
</Floating>

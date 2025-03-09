<script lang="ts">
	import { Button } from '../button/index.js';

	type T = $$Generic;
	type TKey = $$Generic;
	let {
		items = $bindable([]),
		value = $bindable(undefined),
		getKey = (item: T) => item as unknown as TKey,
		getDisplayValue = (item: T) => item as unknown as string,
		textNone = 'None',
		allowNone = false,
		onchange
	}: {
		items: T[];
		value: T | undefined;
		getKey?: (item: T) => TKey;
		getDisplayValue: (item: T) => string;
		textNone?: string;
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

<div class="radio-buttons">
	{#if allowNone}
		<Button variant="integrated" label={textNone} onclick={() => setValue()} />
	{/if}
	{#each items as item, i (i)}
		<Button
			variant="integrated"
			label={getDisplayValue(item)}
			onclick={() => setValue(item)}
			active={(value && getKey(value)) == getKey(item)}
		/>
	{/each}
</div>

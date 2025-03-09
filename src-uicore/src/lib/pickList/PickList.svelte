<script lang="ts">
	import { Button } from '../button/index.js';
	import { Floating } from '../floating/index.js';
	import { Icon, icons } from '../icon/index.js';

	type T = $$Generic;
	type TKey = $$Generic;
	let {
		items = $bindable([]),
		values = $bindable([]),
		getKey = (item: T) => item as unknown as TKey,
		getDisplayValue = (item: T) => item as unknown as string,
		onchange
	}: {
		items: T[];
		values: T[];
		getKey?: (item: T) => TKey;
		getDisplayValue: (item: T) => string;
		onchange?: (item: T | undefined, index: number) => unknown;
	} = $props();

	function toggleValue(newValue: T) {
		const key = getKey(newValue);
		if (values.find((i) => getKey(i) == key)) {
			values = values.filter((i) => getKey(i) !== key);
		} else {
			values.push(newValue);
		}
		const index = items.findIndex((item) => getKey(item) === key);
		onchange?.(newValue, index);
	}
</script>

<div class="pick-list">
	<div>
		{#each items.filter((i) => !values.find((v) => getKey(v) === getKey(i))) as item, i (i)}
			<Button
				variant="integrated"
				label={getDisplayValue(item)}
				onclick={() => toggleValue(item)}
				class="w-full !rounded-none"
			/>
		{/each}
	</div>
	<div>
		{#each values as item, i (i)}
			<Button
				variant="integrated"
				label={getDisplayValue(item)}
				onclick={() => toggleValue(item)}
				class="w-full !rounded-none"
				active={!!values.find((v) => getKey(v) == getKey(item))}
			/>
		{/each}
	</div>
</div>

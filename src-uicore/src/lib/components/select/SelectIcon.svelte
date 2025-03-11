<script lang="ts">
	import { Icon, icons } from '$lib/index.js';
	import { Select } from './index.js';

	let {
		value = $bindable(),
		placeholder,
		onchange
	}: {
		value: string | null;
		placeholder?: string;
		onchange?: (item: string | null) => unknown;
	} = $props();

	let items = [
		icons.controls.add,
		icons.controls.add,
		icons.controls.add,
		icons.controls.add,
		icons.controls.add,
		icons.controls.close
	];
</script>

<Select {items} bind:value getDisplayValue={(i) => i} {placeholder} {onchange}>
	{#snippet item({ item })}
		<Icon name={item} />
	{/snippet}
</Select>

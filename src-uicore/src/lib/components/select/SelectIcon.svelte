<script lang="ts">
	import { Icon, icons } from '$lib/index.js';
	import { Select } from './index.js';

	let {
		name,
		value = $bindable(),
		placeholder,
		onchange
	}: {
		name?: string;
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

<Select {name} {items} bind:value getDisplayValue={(i) => i} {placeholder} {onchange}>
	{#snippet item({ item })}
		<Icon name={item} />
	{/snippet}
</Select>

<script lang="ts">
	import { Button } from '$lib/index.js';
	import { Icon, icons } from '$lib/index.js';
	import { Text } from '$lib/index.js';
	import { type TableContext } from './index.js';

	type T = $$Generic<writable>;
	let {
		table
	}: {
		table: TableContext<T>;
	} = $props();
</script>

{#each $table.columns as col}
	<div {...col.header} class="table-cell-header table-cell {col.header?.class ?? ''}">
		{#if typeof col.key === 'number'}
			<Text>
				{col.title}
			</Text>
		{:else}
			<Button variant="form" label={col.title}>
				<Text>{col.title}</Text>
				<Icon name={icons.controls.dropdown} />
			</Button>
		{/if}
	</div>
{/each}

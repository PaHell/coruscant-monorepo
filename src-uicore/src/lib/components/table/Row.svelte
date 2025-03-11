<script lang="ts">
	import { RowStateClassMap, type RowContext, type TableContext } from './index.js';

	type T = $$Generic<writable>;
	let {
		context,
		table
	}: {
		context: RowContext<T>;
		table: TableContext<T>;
	} = $props();
</script>

<div
	class="table-row-data table-row table-row-state-{RowStateClassMap[$context.state]}"
	class:table-row-selected={$context.selected}
>
	{#each $table.columns as col}
		<div {...col.cell} class="table-cell-data table-cell {col.cell?.class ?? ''}">
			{@render col.children({ ...$context, ...context })}
		</div>
	{/each}
</div>

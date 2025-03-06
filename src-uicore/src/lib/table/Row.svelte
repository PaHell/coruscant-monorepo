<script lang="ts">
	import { type RowContext, type TableContext } from './index.js';

	type T = $$Generic<writable>;
	let {
		context,
		table
	}: {
		context: RowContext<T>;
		table: TableContext<T>;
	} = $props();
</script>

{#each $table.columns as col}
	<div {...col.cell} class="cell {col.cell?.class ?? ''}">
		{@render col.children({ ...$context, ...context })}
	</div>
{/each}

<script lang="ts">
	import { onDestroy } from 'svelte';
	import { type ColumnProperties, type TableContext } from './index.js';

	type T = $$Generic;
	let {
		key = Math.trunc(Math.random() * 100000),
		table,
		...column
	}: ColumnProperties<T> & {
		table: TableContext<T>;
	} = $props();

	table.register({ ...column, key });
	onDestroy(() => table.destroy(key));
</script>

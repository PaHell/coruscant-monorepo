<script lang="ts">
	import './style.css';
	import { getContext, onDestroy, setContext, type Snippet } from 'svelte';
	import {
		TableContextKey,
		type ColumnProperties,
		type RowContext,
		type TableContext
	} from './index.js';

	type T = $$Generic;
	let {
		table,
		key = Math.random().toString(36).slice(2),
		title,
		width,
		children,
		...others
	}: ColumnProperties<T> & {
		table: TableContext<T>;
	} = $props();

	table.register({ key, title, width, children });
	onDestroy(() => table.destroy(key));
</script>

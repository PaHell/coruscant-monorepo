<script lang="ts">
	import './style.css';
	import { Column, RowState, type RowContext, type TableContext } from './index.js';
	import { type Snippet } from 'svelte';
	import { get } from 'svelte/store';
	import { Button } from '../button/index.js';

	type T = $$Generic;
	let {
		table,
		onEdit,
		children
	}: {
		table: TableContext<T>;
		onEdit?: (event: Event) => void;
		children: Snippet<[]>;
	} = $props();
</script>

<Column {table} title="State">
	{#snippet children(row)}
		<div class="state-{get(row).state.toString()}"></div>
	{/snippet}
</Column>
{@render children()}
<Column {table} title="Actions">
	{#snippet children(row)}
		<Button label="Edit" onclick={onEdit} />
		<Button
			label={get(row).state === RowState.Deleted ? 'Keep' : 'Delete'}
			onclick={row.toggleDelete}
		/>
	{/snippet}
</Column>

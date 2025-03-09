<script lang="ts">
	import { Button } from '../button/index.js';
	import { Text } from '../text/index.js';
	import { onDestroy, setContext, type Snippet } from 'svelte';
	import { Alert } from '../alert/index.js';
	import type { HTMLFormAttributes } from 'svelte/elements';
	import {
		Column,
		createRowStore,
		createTableStore,
		HeaderRow,
		Row,
		RowState,
		RowStateClassMap,
		TableContextKey,
		type InitRowStoreData,
		type RowContext,
		type RowStoreData,
		type RowStoreMethods,
		type TableContext,
		type TableProperties
	} from './index.js';
	import { get } from 'svelte/store';
	import { Checkbox } from '../checkbox/index.js';
	import { icons } from '../icon/index.js';

	type T = $$Generic<object>;
	let {
		key = 'id' as keyof T,
		items = $bindable(),
		selected = $bindable([]),
		searchValue = $bindable(''),
		hideState = false,
		hideCheckbox = false,
		allowDelete = true,
		onAdd,
		onChange,
		columns,
		actions,
		...others
	}: TableProperties<T> & {
		columns: Snippet<[TableContext<T>]>;
		actions?: Snippet<[RowStoreData<T> & RowStoreMethods<T>]>;
	} = $props();

	let tableStyle = $state('');
	const store = createTableStore<T>();

	const unsubscriber = store.subscribe((value) => {
		tableStyle = `grid-template-columns: ${value.columns.map((c) => c.width ?? '1fr').join(' ')};`;
	});

	let contexts: RowContext<T>[] = [];

	onDestroy(unsubscriber);

	function getOrCreateRowContext(item: T): RowContext<T> {
		const context = contexts.find((s) => get(s).data[key] === item[key]);
		if (context) return context;
		const newRow = createRowContext({ data: item, state: RowState.Unmodified });
		contexts.push(newRow);
		return newRow;
	}

	function createRowContext(data: InitRowStoreData<T>) {
		const context = createRowStore(data);
		contexts.push(context);
		return context;
	}
</script>

<div class="app-table" style={tableStyle}>
	{#if !hideState}
		<Column table={store} title="" width="2rem" cell={{ class: 'state-cell' }}>
			{#snippet children(row)}
				<div class="state-{RowStateClassMap[row.state]}"></div>
			{/snippet}
		</Column>
	{/if}
	{#if !hideCheckbox}
		<Column table={store} title="Checkbox" width="3rem" cell={{ class: 'table-cell-select' }}>
			{#snippet children(row)}
				<Checkbox value={row.selected} onchange={row.toggleSelected} label="" />
			{/snippet}
		</Column>
	{/if}
	{@render columns(store)}
	{#if allowDelete || actions}
		<Column table={store} title="Actions" width="auto" cell={{ class: 'table-cell-actions' }}>
			{#snippet children(row)}
				{@render actions?.(row)}
				{#if allowDelete}
					<Button
						variant="form"
						icon={row.state === RowState.Deleted ? icons.controls.undo : icons.controls.delete}
						label={row.state === RowState.Deleted ? 'Keep' : 'Delete'}
						onclick={row.toggleDelete}
						hideLabel
					/>
				{/if}
			{/snippet}
		</Column>
	{/if}
	<div class="table-row-header table-row">
		<HeaderRow table={store} />
	</div>
	{#each items as item}
		<Row table={store} context={getOrCreateRowContext(item)} />
	{/each}
</div>

<script lang="ts">
	import './style.css';
	import { Button } from '../button/index.js';
	import { Text } from '../text/index.js';
	import { setContext, type Snippet } from 'svelte';
	import { Alert } from '../alert/index.js';
	import type { HTMLFormAttributes } from 'svelte/elements';
	import {
		Column,
		createRowStore,
		createTableStore,
		RowState,
		TableContextKey,
		type RowContext,
		type RowStoreData,
		type TableContext,
		type TableProperties
	} from './index.js';
	import { get } from 'svelte/store';
	import { Checkbox } from '../checkbox/index.js';
	import { createSubscriber } from 'svelte/reactivity';
	import Subscriber from './Subscriber.svelte';

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
		actions?: Snippet<[RowContext<T>]>;
	} = $props();

	const store = createTableStore<T>();

	let contexts: RowContext<T>[] = $state([]);
	$effect(() => {
		for (const item of items) {
			getOrCreateRowContext(item);
		}
	});

	function getOrCreateRowContext(item: T): RowContext<T> {
		const context = contexts.find((s) => get(s).data[key] === item[key]);
		if (context) return context;
		const newRow = createRowStore({
			state: RowState.Unmodified,
			data: item
		});
		contexts.push(newRow);
		return newRow;
	}
</script>

{#if !hideState}
	<Column table={store} title="State">
		{#snippet children(row)}
			<Subscriber store={row}>
				{#snippet children(data)}
					<pre>{data.state}</pre>
					<div class="state-{get(row).state.toString()}">{get(row).state.toString()}</div>
				{/snippet}
			</Subscriber>
		{/snippet}
	</Column>
{/if}
{#if !hideCheckbox}
	<Column table={store} title="Checkbox">
		{#snippet children(row)}
			<Checkbox
				variant="checkbox"
				value={get(row).selected}
				onchange={row.toggleSelected}
				label=""
			/>
		{/snippet}
	</Column>
{/if}
{@render columns(store)}
{#if allowDelete || actions}
	<Column table={store} title="Actions">
		{#snippet children(row)}
			{@render actions?.(row)}
			{#if allowDelete}
				<Button
					label={get(row).state === RowState.Deleted ? 'Keep' : 'Delete'}
					onclick={row.toggleDelete}
				/>
			{/if}
		{/snippet}
	</Column>
{/if}
<table>
	<thead>
		<tr>
			{#each get(store).columns as col}
				<th>{col.key}: {col.title}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each contexts as row}
			<tr>
				{#each get(store).columns as col}
					<td>
						{@render col.children(row)}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<script lang="ts">
	import './style.css';
	import { Button } from '../button/index.js';
	import { Text } from '../text/index.js';
	import { setContext, type Snippet } from 'svelte';
	import { Alert } from '../alert/index.js';
	import type { HTMLFormAttributes } from 'svelte/elements';
	import {
		createRowStore,
		createTableStore,
		Row,
		RowState,
		TableContextKey,
		type RowContext,
		type TableContext,
		type TableProperties
	} from './index.js';
	import { get } from 'svelte/store';

	type T = $$Generic<object>;
	let {
		key = 'id' as keyof T,
		items = $bindable(),
		selected = $bindable([]),
		onAdd,
		onEdit,
		onDelete,
		onSelect,
		onChange,
		children,
		...others
	}: TableProperties<T> & {
		children: Snippet<[TableContext<T>]>;
	} = $props();

	const store = createTableStore<T>();
	const contexts: RowContext<T>[] = $state([]);

	$effect(() => {
		const contextDataIds = contexts.map((s) => get(s).data[key]);
		for (const item of items) {
			if (contextDataIds.find((id) => id === item[key])) continue;
			contexts.push(
				createRowStore({
					state: RowState.Unmodified,
					data: item
				})
			);
		}
	});
</script>

<Row table={store}>
	{@render children(store)}
</Row>
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

<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Table from '$lib/table/Table.svelte';
	import { Button, icons } from '$src/lib/index.js';
	import { Column, type RowContext } from '$src/lib/table/index.js';
	import { get } from 'svelte/store';
	import Subscriber from '$src/lib/table/Subscriber.svelte';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Atoms/Table',
		component: Table,
		tags: ['autodocs'],
		argTypes: {},
		args: {}
	});

	type Model = {
		id: number;
		name: string;
		description?: string;
	};

	const items: Model[] = Array.from({ length: 10 }, (_, i) => i + 1).map((i) => ({
		id: i,
		name: `Item ${i}`,
		description: `Description ${i}`
	}));
	console.log(items);

	function onEdit(row: RowContext<Model>) {
		console.log('Edit', get(row).data);
	}
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default" args={{ items }}>
	<Table {items}>
		{#snippet actions(row)}
			<Button icon={icons.controls.add} label="Edit" onclick={() => onEdit(row)} />
		{/snippet}
		{#snippet columns(table)}
			<Column {table} key="id" title="ID">
				{#snippet children(row)}
					<Subscriber store={row}>
						{#snippet children(data)}
							{data.id}
						{/snippet}
					</Subscriber>
					{get(row).data.id}
				{/snippet}
			</Column>
			<Column {table} key="name" title="Name">
				{#snippet children(row)}
					{get(row).data.name}
				{/snippet}
			</Column>
			<Column {table} key="description" title="Description">
				{#snippet children(row)}
					{get(row).data.name}
				{/snippet}
			</Column>
		{/snippet}
	</Table>
</Story>

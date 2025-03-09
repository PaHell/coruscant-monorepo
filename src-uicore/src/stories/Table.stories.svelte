<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Table from '$lib/table/Table.svelte';
	import { Button, icons } from '$src/lib/index.js';
	import { Column, type RowContext } from '$src/lib/table/index.js';
	import { get } from 'svelte/store';
	import { Text } from '$src/lib/text/index.js';
	import { Input } from '$src/lib/input/index.js';

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

	const items: Model[] = Array.from({ length: 5 }, (_, i) => i + 1).map((i) => ({
		id: i,
		name: `Item ${i}`,
		description: `Description ${i}`
	}));
	console.log(items);

	function onEdit(item: Model) {
		console.log('Edit', item);
	}
</script>

<Story name="Default" args={{ items }}>
	<Table {items}>
		{#snippet actions({ data })}
			<Button
				variant="form"
				icon={icons.controls.edit}
				label="Edit"
				hideLabel
				onclick={() => onEdit(data)}
			/>
		{/snippet}
		{#snippet columns(table)}
			<Column {table} key="id" title="ID" width="1fr" cell={{ class: 'text-end' }}>
				{#snippet children({ data })}
					<Text>{data.id}</Text>
				{/snippet}
			</Column>
			<Column {table} key="name" title="Name" width="2fr">
				{#snippet children({ data, updateProperty })}
					<Input
						value={data.name}
						onchange={(e) => updateProperty('name', e.currentTarget.value)}
					/>
				{/snippet}
			</Column>
			<Column {table} key="description" title="Description" width="3fr">
				{#snippet children({ data, updateProperty })}
					<Input
						value={data.description}
						onchange={(e) => updateProperty('description', e.currentTarget.value)}
					/>
				{/snippet}
			</Column>
		{/snippet}
	</Table>
</Story>

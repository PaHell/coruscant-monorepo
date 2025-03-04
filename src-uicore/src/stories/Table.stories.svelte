<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Table from '$lib/table/Table.svelte';
	import { icons } from '$src/lib/index.js';
	import { Column } from '$src/lib/table/index.js';
	import { get } from 'svelte/store';

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
	};

	const items: Model[] = [
		{ id: 1, name: 'Item 1' },
		{ id: 2, name: 'Item 2' },
		{ id: 3, name: 'Item 3' }
	];
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default" args={{ items }}>
	<Table {items}>
		{#snippet children(table)}
			<Column {table} key="id" title="ID">
				{#snippet children(row)}
					{get(row).data.id}
				{/snippet}
			</Column>
			<Column {table} key="name" title="Name">
				{#snippet children(row)}
					{get(row).data.name}
				{/snippet}
			</Column>
		{/snippet}
	</Table>
</Story>

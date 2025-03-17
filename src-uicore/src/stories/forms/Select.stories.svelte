<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Select, SelectEnum, SelectId } from '$lib/index.js';
	import { OperatingSystem } from '../index.js';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Forms/Select',
		component: Select,
		tags: ['autodocs'],
		argTypes: {},
		args: {}
	});

	let simpleItems: string[] = $state([
		'Apple',
		'Banana',
		'Cherry',
		'Maplenut Ice Cream Sandwich with Chocolate Chips'
	]);
	let simpleValue: string | null = $state(null);

	let enumValue = $state(OperatingSystem.MacOs);

	let objects: { id: number; title: string }[] = [
		{
			id: 0,
			title: 'Lorem'
		},
		{
			id: 1,
			title: 'Ipsum'
		},
		{
			id: 2,
			title: 'Dolor'
		},
		{
			id: 3,
			title: 'Sit amet'
		}
	];
	let objectValue = $state(3);
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default">
	<Select
		items={simpleItems}
		bind:value={simpleValue}
		getKey={(i) => i}
		getDisplayValue={(i) => i}
		allowNone
	/>
	{simpleValue}
</Story>
<Story name="Enum">
	<SelectEnum
		entries={Object.entries(OperatingSystem)}
		bind:value={enumValue}
		getDisplayValue={(i) => i[0]}
	/>
	{enumValue}
</Story>
<Story name="Id">
	<SelectId items={objects} bind:value={objectValue} getDisplayValue={(i) => i.title} allowNone />
	{objectValue}
</Story>

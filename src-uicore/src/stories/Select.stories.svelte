<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Select } from '$lib/select/index.js';
	import SelectEnum from '$src/lib/select/SelectEnum.svelte';
	import { OperatingSystem } from './index.js';
	import SelectId from '$src/lib/select/SelectId.svelte';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Atoms/Select',
		component: Select,
		tags: ['autodocs'],
		argTypes: {},
		args: {}
	});

	let simpleItems: string[] = $state(['Apple', 'Banana', 'Cherry']);
	let simpleValue: string | undefined = $state(undefined);

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

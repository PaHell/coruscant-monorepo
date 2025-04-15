<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { TabNavigation } from '$lib/index.js';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Navigation/TabNavigation',
		component: TabNavigation,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: {
					type: 'select',
					options: ['tabs', 'pills', 'bar']
				}
			},
			fullWidth: {
				control: {
					type: 'boolean'
				}
			}
		},
		args: {}
	});

	type NavigationItem = { label: string; href: string };
	const items: NavigationItem[] = [
		{ label: 'Tab 1', href: '#n1' },
		{ label: 'Tab 2', href: '#n2' },
		{ label: 'Tab 3', href: '#n3' }
	];

	const pathSelector = (i: NavigationItem) => i.href;
	const textSelector = (i: NavigationItem) => i.label;
</script>

{#snippet children({ item })}
	{item?.label}
{/snippet}

<Story name="Default" args={{ items, pathSelector, textSelector, children }} />

<Story name="Variants">
	<div id="#n1">
		{#each [true, false] as fullWidth}
			{#each ['tabs', 'pills', 'bar'] as variant}
				<TabNavigation
					{variant}
					{items}
					pathSelector={(i) => i.href}
					textSelector={(i) => i.label}
					{fullWidth}
					{children}
				/>
			{/each}
		{/each}
	</div>
</Story>

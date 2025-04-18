<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { TabNavigation } from '$lib/index.js';

	type NavigationItem = { label: string; href: string; badge?: string | number | null };
	const items: NavigationItem[] = [
		{ label: 'Tab 1', href: '#n1' },
		{ label: 'Tab 2', href: '#n2', badge: 2 },
		{ label: 'Tab 3', href: '#n3' }
	];

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
		args: {
			variant: 'tabs',
			fullWidth: false,
			match: 0,
			matchQuery: '',
			pathSelector: (i: NavigationItem) => i.href,
			textSelector: (i: NavigationItem) => i.label,
			badgeValueSelector: (i: NavigationItem) => i.badge,
			items: items
		}
	});
</script>

<Story name="Default">
	{#snippet children(args)}
		<TabNavigation {...args}>
			{#snippet children({ item })}
				{item?.label}
			{/snippet}
		</TabNavigation>
	{/snippet}
</Story>

<Story name="Variants">
	<div class="space-y-4">
		{#each [true, false] as fullWidth}
			{#each ['tabs', 'pills', 'bar'] as variant}
				<TabNavigation
					{variant}
					{items}
					pathSelector={(i) => i.href}
					textSelector={(i) => i.label}
					badgeValueSelector={(i) => i.badge}
					{fullWidth}
				>
					{#snippet children({ item })}
						{item?.label}
					{/snippet}
				</TabNavigation>
			{/each}
		{/each}
	</div>
</Story>

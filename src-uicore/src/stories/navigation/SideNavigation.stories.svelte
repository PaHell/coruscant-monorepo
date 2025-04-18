<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { icons, SideNavigation, type SideNavigationItem } from '$lib/index.js';

	const items: SideNavigationItem[] = [
		{ icon: icons.controls.add, label: 'Tab 1', href: '#n1' },
		{ icon: icons.controls.add, label: 'Tab 2', href: '#n2', badge: 2 },
		{
			icon: icons.controls.add,
			label: 'Tab 2',
			href: '#n2',
			badge: 2,
			children: [
				{ icon: icons.controls.add, label: 'Tab 2.1', href: '#n2-1' },
				{ icon: icons.controls.add, label: 'Tab 2.2', href: '#n2-2' },
				{ icon: icons.controls.add, label: 'Tab 2.3', href: '#n2-3' }
			]
		},
		{
			icon: icons.controls.add,
			label: 'Tab 3',
			href: '#n3',
			children: [
				{ icon: icons.controls.add, label: 'Tab 3.1', href: '#n3-1' },
				{ icon: icons.controls.add, label: 'Tab 3.2', href: '#n3-2' },
				{ icon: icons.controls.add, label: 'Tab 3.3', href: '#n3-3' }
			]
		}
	];

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Navigation/SideNavigation',
		component: SideNavigation,
		tags: ['autodocs'],
		argTypes: {},
		args: {
			match: 0,
			items
		}
	});
</script>

<Story name="Default" args={{ items }}>
	{#snippet children(args)}
		<SideNavigation {...args} />
	{/snippet}
</Story>

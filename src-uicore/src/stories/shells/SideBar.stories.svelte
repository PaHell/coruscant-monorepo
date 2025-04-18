<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import {
		Button,
		icons,
		SideBar,
		SideNavigation,
		Text,
		UserAvatar,
		type SideNavigationItem
	} from '$lib/index.js';

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
		title: 'Shells/SideBar',
		component: SideBar,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['theme', 'accent', 'dark'],
				description: 'Theme of the sidebar'
			},
			logoSrc: {
				control: { type: 'text' },
				description: 'Source for the logo of the application'
			},
			name: {
				control: { type: 'text' },
				description: 'Name of the application'
			},
			hrefHome: {
				control: { type: 'text' },
				description: 'URL of the home page'
			},
			collapsed: {
				control: { type: 'boolean' },
				description: 'Whether the sidebar is collapsed'
			},
			collapsable: {
				control: { type: 'boolean' },
				description: 'Whether the sidebar can be collapsed'
			}
		},
		args: {
			variant: 'theme',
			logoSrc:
				'https://raw.githubusercontent.com/sveltejs/branding/refs/heads/master/svelte-logo-cutout.svg',
			name: 'Svelte',
			hrefHome: '/',
			collapsed: false,
			collapsable: true,
			class: '!h-[50vh]'
		}
	});
</script>

<Story name="Default" args={{}}>
	{#snippet children(args)}
		<SideBar {...args}>
			{#snippet body()}
				<SideNavigation {items} />
			{/snippet}
			{#snippet footer({ collapsed })}
				<UserAvatar
					src="https://xsgames.co/randomusers/avatar.php?g=female"
					label="User avatar small"
					size="sm"
					status="online"
					class="flex-1"
					hideLabel={collapsed}
				/>
				<Button variant="integrated" size="lg" icon={icons.controls.add} value="Logout" hideValue />
			{/snippet}
		</SideBar>
	{/snippet}
</Story>

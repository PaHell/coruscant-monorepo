<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { icons, Header } from '$lib/index.js';

	type NavigationItem = {
		icon: string;
		label: string;
		href: string;
		badge?: number;
	};
	const items: NavigationItem[] = [
		{ icon: icons.controls.add, label: 'Tab 1', href: '#n1' },
		{ icon: icons.controls.add, label: 'Tab 2', href: '#n2', badge: 2 },
		{
			icon: icons.controls.add,
			label: 'Tab 2',
			href: '#n2',
			badge: 2
		},
		{
			icon: icons.controls.add,
			label: 'Tab 3',
			href: '#n3'
		}
	];

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Shells/Header',
		component: Header,
		tags: ['autodocs'],
		argTypes: {
			logoSrc: {
				control: { type: 'text' },
				description: 'Source for the logo of the application'
			},
			appName: {
				control: { type: 'text' },
				description: 'Name of the application'
			},
			hrefHome: {
				control: { type: 'text' },
				description: 'URL of the home page'
			}
		},
		args: {
			logoSrc:
				'https://raw.githubusercontent.com/sveltejs/branding/refs/heads/master/svelte-logo-cutout.svg',
			appName: 'Svelte',
			hrefHome: '/',
			navigation: items,
			links: [
				{ label: 'Link 1', href: '#link1' },
				{ label: 'Link 2', href: '#link2' }
			],
			userName: 'Emma Watson',
			userAvatar: 'https://xsgames.co/randomusers/avatar.php?g=female'
		}
	});
</script>

<Story name="Default" args={{}} />

<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Footer } from '$lib/index.js';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Shells/Footer',
		component: Footer,
		tags: ['autodocs'],
		argTypes: {
			copyright: {
				control: { type: 'text' },
				description: 'Copyright text to be displayed in the footer'
			},
			links: {
				control: { type: 'object' },
				description: 'Array of links to be displayed in the footer'
			}
		},
		args: {
			copyright: '© 2023 Svelte',
			links: [
				{ label: 'Link 1', href: '#link1' },
				{ label: 'Link 2', href: '#link2' }
			]
		}
	});
</script>

<Story name="Default" args={{}} />

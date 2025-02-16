<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Heading from '$lib/text/Heading.svelte';
	import Text from '$src/lib/text/Text.svelte';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Atoms/Text',
		component: Heading,
		tags: ['autodocs'],
		argTypes: {
			level: {
				control: { type: 'number' },
				options: [1, 2, 3, 4, 5, 6]
			}
		},
		args: {}
	});
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
{#snippet label()}
	Label
{/snippet}

<Story name="Default" args={{ children: label }} />

<Story name="Levels" args={{ children: label }}>
	<Heading level={1}>Heading 1</Heading>
	<Heading level={2}>Heading 2</Heading>
	<Heading level={3}>Heading 3</Heading>
	<Heading level={4}>Heading 4</Heading>
	<Heading level={5}>Heading 5</Heading>
	<Heading level={6}>Heading 6</Heading>
	<Text>Normal text</Text>
	<Text secondary>Secondary text</Text>
	<Text small>Small text</Text>
</Story>

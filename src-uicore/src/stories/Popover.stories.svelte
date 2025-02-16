<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Popover } from '$lib/popover/index.js';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Atoms/Popover',
		component: Popover,
		tags: ['autodocs'],
		argTypes: {},
		args: {}
	});
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default" args={{}} />
<Story name="Variants" args={{}}>
	<div class="grid grid-cols-3 justify-start gap-4"></div>
</Story>

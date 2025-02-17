<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Popover } from '$lib/popover/index.js';
	import { Text } from '$lib/text/index.js';
	import { Button } from '$lib/button/index.js';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Atoms/Popover',
		component: Popover,
		tags: ['autodocs'],
		argTypes: {},
		args: {}
	});
</script>

{#snippet trigger()}
	<Button label="Label" class="m-48" />
{/snippet}
{#snippet menu()}
	<Text>Menu</Text>
{/snippet}
<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default" args={{ position: 'bottom', trigger, menu }} />

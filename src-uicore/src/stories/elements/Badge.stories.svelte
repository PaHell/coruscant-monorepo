<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Badge, Input, icons, Text, Button, Icon, Heading } from '$lib/index.js';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Elements/Badge',
		component: Badge,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: {
					type: 'select',
					options: ['dot', 'flat', 'border']
				}
			},
			color: {
				control: {
					type: 'select',
					options: ['gray', 'red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink']
				}
			},
			pill: {
				control: { type: 'boolean' }
			},
			label: { control: { type: 'text' } }
		},
		args: {}
	});
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default" args={{ variant: 'dot', label: 'Badge', color: 'red' }}>
	{#snippet children(args)}
		<div class="flex">
			<Badge {...args} />
		</div>
	{/snippet}
</Story>
<Story name="Variants">
	<div class="flex flex-wrap space-y-4 space-x-4">
		{#each ['dot', 'flat', 'border'] as variant}
			{#each ['gray', 'red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink'] as color}
				<Badge label="{variant}-{color}" {variant} {color} />
				<Badge label="{variant}-{color}-pill" {variant} {color} pill />
			{/each}
		{/each}
	</div>
</Story>

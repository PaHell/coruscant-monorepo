<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Text, Button, Floating } from '$lib/index.js';
	import type { Placement } from '@floating-ui/dom';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Atoms/Floating',
		component: Floating,
		tags: ['autodocs'],
		argTypes: {},
		args: {}
	});

	let placement: Placement = $state('bottom-start');

	function randomPlacement() {
		placement =
			['top', 'right', 'bottom', 'left'][Math.floor(Math.random() * 4)] +
			['-start', '-end', '', ''][Math.floor(Math.random() * 4)];
	}
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default">
	<Floating {placement}>
		{#snippet trigger({ open })}
			<Button
				label={placement.toUpperCase()}
				class="mx-auto my-24 w-32"
				onclick={() => {
					randomPlacement();
					open();
				}}
			/>
		{/snippet}
		{#snippet menu()}
			<Text>Menu</Text>
		{/snippet}
	</Floating>
</Story>

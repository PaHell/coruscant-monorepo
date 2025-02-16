<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from '$lib/button/Button.svelte';
	import { icons } from '$src/lib/index.js';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Atoms/Button',
		component: Button,
		tags: ['autodocs'],
		argTypes: {},
		args: {}
	});
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default" args={{ variant: 'default', label: 'Button' }} />
<Story name="Variants" args={{}}>
	<div class="grid grid-cols-3 justify-start gap-4">
		{#each ['default', 'primary', 'outline', 'subtle', 'transparent', 'warning', 'danger'] as variant}
			<div>
				<Button {variant} label="Button" />
			</div>
			<div>
				<Button {variant} label="Button" icon={icons.controls.add} />
			</div>
			<div>
				<Button {variant} label="Button" icon={icons.controls.add} hideLabel />
			</div>
		{/each}
	</div>
</Story>

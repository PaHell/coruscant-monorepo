<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Button, icons, Text } from '$lib/index.js';

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
<Story name="Default" args={{ variant: 'primary', label: 'Button' }} />
<Story name="Variants" args={{}}>
	<div class="grid grid-cols-[auto_auto_auto] justify-start gap-4">
		{#each ['primary', 'secondary', 'soft', 'integrated', 'link', 'warning', 'danger'] as variant}
			{#each ['sm', 'md', 'lg'] as size}
				<div>
					<Button {variant} {size} label="Button" />
				</div>
				<div>
					<Button {variant} {size} label="Button" icon={icons.controls.add} />
				</div>
				<div>
					<Button {variant} {size} label="Button" icon={icons.controls.add} hideLabel />
				</div>
			{/each}
		{/each}
	</div>
</Story>
<Story name="Groups" args={{}}>
	<div class="flex flex-col items-start gap-y-4">
		<div class="button-group">
			<Button variant="secondary" icon={icons.controls.add} label="Prev" hideLabel />
			<Button variant="secondary" icon={icons.controls.add} label="Button" hideLabel />
			<Button variant="secondary" icon={icons.controls.add} label="Next" hideLabel />
		</div>
		<div class="button-group">
			<Button variant="secondary" icon={icons.controls.add} label="Decrement" hideLabel />
			<Text>128</Text>
			<Button variant="secondary" icon={icons.controls.delete} label="Increment" hideLabel />
		</div>
		<div class="button-group !ring-0">
			<Button variant="primary" icon={icons.controls.send} label="Send" />
			<Button variant="primary" icon={icons.controls.dropdown} label="More" hideLabel />
		</div>
	</div>
</Story>

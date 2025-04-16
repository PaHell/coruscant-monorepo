<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Button, Input, icons, Text, Link } from '$lib/index.js';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Forms/Button & Link',
		component: Button,
		tags: ['autodocs'],
		argTypes: {},
		args: {}
	});

	const components = {
		button: Button,
		link: Link
	};
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default" args={{ variant: 'primary', value: 'Button' }} />
<Story name="Variants" args={{}}>
	<div class="flex flex-wrap space-y-4 space-x-4">
		{#each ['primary', 'secondary', 'soft', 'integrated', 'link', 'warning', 'danger'] as variant}
			{#each ['sm', 'md', 'lg'] as size}
				{#each Object.entries(components) as [key, value]}
					<div>
						<svelte:component this={value} {variant} {size} value={key} />
					</div>
					<div>
						<svelte:component this={value} {variant} {size} value={key} icon={icons.controls.add} />
					</div>
					<div>
						<svelte:component
							this={value}
							{variant}
							{size}
							value={key}
							icon={icons.controls.add}
							hideValue
						/>
					</div>
					<div>
						<svelte:component
							this={value}
							{variant}
							{size}
							value={key}
							icon={icons.controls.add}
							disabled
						/>
					</div>
					<div>
						<svelte:component
							this={value}
							{variant}
							{size}
							value={key}
							icon={icons.controls.add}
							active
						/>
					</div>
				{/each}
			{/each}
		{/each}
	</div>
</Story>
<Story name="Groups" args={{}}>
	<div class="flex flex-col items-start gap-y-4">
		<div class="button-group">
			<Button
				onclick={() => {
					console.log('Button clicked');
				}}
				variant="secondary"
				icon={icons.controls.add}
				value="Prev"
				hideValue
			/>
			<Button variant="secondary" icon={icons.controls.add} value="Button" hideValue />
			<Button variant="secondary" icon={icons.controls.add} value="Next" hideValue />
		</div>
		<div class="button-group">
			<Button variant="secondary" icon={icons.controls.add} value="Decrement" hideValue />
			<Text>128</Text>
			<Button variant="secondary" icon={icons.controls.delete} value="Increment" hideValue />
		</div>
		<div class="button-group !ring-0">
			<Button variant="primary" icon={icons.controls.send} value="Send" />
			<Button variant="primary" icon={icons.controls.dropdown} value="More" hideValue />
		</div>
		<div class="button-group">
			<Text>https://</Text>
			<Input value="google.de" />
			<Button variant="secondary" icon={icons.controls.add} value="Increment" hideValue />
		</div>
		<div class="button-group">
			<Text>https://</Text>
			<Input value="google.de" />
			<Button size="lg" variant="secondary" icon={icons.controls.add} value="Increment" hideValue />
		</div>
	</div>
</Story>

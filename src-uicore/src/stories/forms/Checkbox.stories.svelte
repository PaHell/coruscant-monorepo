<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Checkbox, Text } from '$lib/index.js';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Forms/Checkbox',
		component: Checkbox,
		tags: ['autodocs'],
		argTypes: {},
		args: {}
	});
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default" args={{ variant: 'default', label: 'Checkbox' }} />
<Story name="Variants" args={{}}>
	<Checkbox name="c1" label="Checkbox" value={true} />
	<Checkbox name="c2" value={true}>
		<span>Checkbox</span>
		<span class="text !text-secondary">Optional</span>
	</Checkbox>
	<Checkbox name="c3" value={true}>
		<Text>Checkbox</Text>
		<Text secondary>Optional</Text>
	</Checkbox>
	<Checkbox variant="toggle" name="c4" label="Toggle" value={true} />
	<Checkbox variant="toggle" name="c5" value={true}>
		<span>Toggle</span>
		<span class="text !text-secondary">Optional</span>
	</Checkbox>
	<Checkbox variant="toggle" name="c6" value={true}>
		<Text>Toggle</Text>
		<Text secondary>Optional</Text>
	</Checkbox>
</Story>

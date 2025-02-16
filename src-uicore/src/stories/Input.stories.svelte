<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Input from '$src/lib/input/Input.svelte';
	import { icons } from '$src/lib/icon/index.js';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Atoms/Input',
		component: Input,
		tags: ['autodocs'],
		argTypes: {},
		args: {}
	});
</script>

<Story name="Default" args={{}} />
<Story name="Variants" args={{}}>
	<div class="mb-4 space-y-4">
		<Input placeholder="Placeholder" />
		<Input label="Label" placeholder="Placeholder" required />
		<Input label="Label" placeholder="Placeholder" isTextarea />
		<Input label="Label" placeholder="Placeholder" isTextarea>
			<p>With children</p>
		</Input>
		<Input icon={icons.controls.add} placeholder="Placeholder" />
		<Input icon={icons.controls.add} label="Label" placeholder="Placeholder" required />
		<Input icon={icons.controls.add} label="Label" placeholder="Placeholder" isTextarea />
		<Input icon={icons.controls.add} label="Label" placeholder="Placeholder" isTextarea>
			<p>With children</p>
		</Input>
	</div>
</Story>

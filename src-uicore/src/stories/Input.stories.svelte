<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { icons, Input } from '$lib/index.js';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story, args } = defineMeta({
		title: 'Atoms/Input',
		component: Input,
		tags: ['autodocs'],
		argTypes: {
			label: { control: 'text' },
			placeholder: { control: 'text' },
			error: { control: 'text' },
			icon: { control: 'text' },
			size: { control: 'inline-radio', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
			isTextarea: { control: 'boolean' },
			required: { control: 'boolean' },
			disabled: { control: 'boolean' }
		},
		args: {
			label: 'Label',
			placeholder: 'Placeholder',
			error: '',
			icon: '',
			size: 'md',
			isTextarea: false,
			required: false,
			disabled: false
		}
	});
</script>

<Story name="Default" {args} />
<Story name="Variants" {args}>
	<div class="mb-4 space-y-4">
		<Input placeholder="Placeholder" />
		<Input label="Label" placeholder="Placeholder" required />
		<Input label="Label" placeholder="Placeholder" isTextarea />
		<Input placeholder="Placeholder" isTextarea>
			<p>With children</p>
		</Input>
		<Input icon={icons.controls.add} placeholder="Placeholder" />
		<Input icon={icons.controls.add} label="Label" placeholder="Placeholder" required />
		<Input icon={icons.controls.add} label="Label" placeholder="Placeholder" isTextarea />
		<Input icon={icons.controls.add} label="Label" placeholder="Placeholder" isTextarea>
			<p>With children</p>
		</Input>
		<Input icon={icons.controls.add} label="Label" placeholder="Placeholder" isTextarea disabled>
			<p>With children</p>
		</Input>
		<Input placeholder="0.00" prefix="$" suffix="USD" />
		<Input icon={icons.controls.add} placeholder="0.00" prefix="$" suffix="USD" />
		<Input label="Label" placeholder="0.00" prefix="$" suffix="USD" />
		<Input icon={icons.controls.add} label="Label" placeholder="0.00" prefix="$" suffix="USD" />
		<Input isTextarea placeholder="0.00" prefix="$" suffix="USD" />
		<Input isTextarea icon={icons.controls.add} placeholder="0.00" prefix="$" suffix="USD" />
		<Input isTextarea label="Label" placeholder="0.00" prefix="$" suffix="USD" />
		<Input
			isTextarea
			icon={icons.controls.add}
			label="Černčice"
			placeholder="0.00"
			prefix="$"
			suffix="USD"
		/>
	</div>
</Story>

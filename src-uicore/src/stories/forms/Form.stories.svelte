<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Form, Input, icons, Text, RadioButtons, Checkbox } from '$lib/index.js';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Forms/Form',
		component: Form,
		tags: ['autodocs'],
		argTypes: {},
		args: {}
	});

	const genders = [
		{
			label: 'Male',
			value: 'm'
		},
		{
			label: 'Female',
			value: 'f'
		},
		{
			label: 'None / Other',
			value: 'd'
		}
	];

	let form = $state({
		name: '',
		email: '',
		gender: '',
		password: '',
		terms: false
	});

	function onSubmit() {}

	function onCancel() {}
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default" args={{}}>
	<Form
		name="form"
		method="post"
		action="http://localhost:3000"
		submit="Submit"
		cancel="Cancel"
		{onSubmit}
		{onCancel}
		debug
	>
		<Input name="name" label="Name" placeholder="Enter your name" bind:value={form.name} />
		<Input
			name="email"
			label="Email"
			placeholder="Enter your email address"
			type="email"
			bind:value={form.email}
		/>
		<RadioButtons
			variant="horizontal"
			title="Select your gender"
			formName="gender"
			items={genders}
			bind:value={form.gender}
			getValue={(item) => item.value}
		>
			{#snippet children(item)}
				{item.label}
			{/snippet}
		</RadioButtons>
		<Checkbox name="terms" label="I agree to the terms and conditions" bind:value={form.terms} />
	</Form>
</Story>

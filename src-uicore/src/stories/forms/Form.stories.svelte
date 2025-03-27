<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import {
		Form,
		Input,
		icons,
		Text,
		RadioButtons,
		Checkbox,
		Select,
		SelectId
	} from '$lib/index.js';

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

	const countries = [
		{
			id: 'us',
			label: 'United States'
		},
		{
			id: 'ca',
			label: 'Canada'
		},
		{
			id: 'mx',
			label: 'Mexico'
		}
	];

	let form = $state({
		name: '',
		email: '',
		gender: '',
		password: '',
		terms: false,
		country: ''
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
		<SelectId
			name="country"
			items={countries}
			getDisplayValue={(i) => i.label}
			bind:value={form.country}
		/>
		<Checkbox name="terms" label="I agree to the terms and conditions" bind:value={form.terms} />
	</Form>
</Story>

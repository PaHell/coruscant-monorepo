<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { RadioButtons, Text } from '$lib/index.js';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Forms/RadioButtons',
		component: RadioButtons,
		tags: ['autodocs'],
		argTypes: {
			title: { control: 'text' }
		},
		args: {}
	});

	type NotificationsType = {
		label: string;
		value: string;
	};
	let notificationsTypes: NotificationsType[] = [
		{ label: 'Email', value: 'email' },
		{ label: 'Phone (SMS)', value: 'phone' },
		{ label: 'Push notification', value: 'push' }
	];
	let notificationsType: HardwareSpecification['value'] = $state('phone');

	type HardwareSpecification = {
		label: string;
		value: string;
		memorySizeInGB: number;
		amountOfCores: number;
		storageSizeInGB: number;
	};
	let hardwareSpecs: HardwareSpecification[] = [
		{
			label: 'Small',
			value: 'sm',
			memorySizeInGB: 4,
			amountOfCores: 2,
			storageSizeInGB: 80
		},
		{
			label: 'Medium',
			value: 'md',
			memorySizeInGB: 8,
			amountOfCores: 4,
			storageSizeInGB: 160
		},
		{
			label: 'Large',
			value: 'lg',
			memorySizeInGB: 16,
			amountOfCores: 8,
			storageSizeInGB: 320
		}
	];
	let hardwareSpec: HardwareSpecification['value'] = $state('sm');
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story
	name="Default"
	args={{
		title: 'Notifications',
		subtitle: 'How do you prefer to receive notifications?',
		formName: 'notifications',
		items: notificationsTypes,
		value: notificationsType,
		getValue: (i) => i.value
	}}
>
	{#snippet children(args)}
		<RadioButtons {...args}>
			{#snippet children(item)}
				{item.label}
			{/snippet}
		</RadioButtons>
	{/snippet}
</Story>
<Story name="Variants" args={{}}>
	<div class="space-y-6">
		<RadioButtons
			variant="vertical"
			title="Notifications"
			subtitle="How do you prefer to receive notifications?"
			formName="notifications1"
			items={notificationsTypes}
			bind:value={notificationsType}
			getValue={(i) => i.value}
		>
			{#snippet children(item)}
				{item.label}
			{/snippet}
		</RadioButtons>
		<RadioButtons
			variant="horizontal"
			title="Notifications"
			subtitle="How do you prefer to receive notifications?"
			formName="notifications2"
			items={notificationsTypes}
			bind:value={notificationsType}
			getValue={(i) => i.value}
		>
			{#snippet children(item)}
				{item.label}
			{/snippet}
		</RadioButtons>
		<RadioButtons
			variant="vertical"
			title="Server Configuration"
			subtitle="What hardware specifications do you need?"
			formName="hardware1"
			items={hardwareSpecs}
			bind:value={hardwareSpec}
			getValue={(i) => i.value}
		>
			{#snippet children(item)}
				<Text class="!text-sm">{item.label}</Text>
				<Text secondary class="!text-sm uppercase">
					<span>{item.memorySizeInGB} GB RAM /</span>
					<span>{item.amountOfCores} CPUs /</span>
					<span>{item.storageSizeInGB} GB SSD Storage</span>
				</Text>
			{/snippet}
		</RadioButtons>
		<RadioButtons
			variant="vertical"
			title="Server Configuration"
			subtitle="What hardware specifications do you need?"
			formName="hardware2"
			items={hardwareSpecs}
			bind:value={hardwareSpec}
			getValue={(i) => i.value}
		>
			{#snippet children(item)}
				<Text class="!text-sm">
					<span>{item.label}</span>
					<span class="text-secondary">{item.memorySizeInGB} GB RAM /</span>
					<span class="text-secondary">{item.amountOfCores} CPUs /</span>
					<span class="text-secondary">{item.storageSizeInGB} GB SSD Storage</span>
				</Text>
			{/snippet}
		</RadioButtons>
		<RadioButtons
			variant="sections"
			title="Server Configuration"
			subtitle="What hardware specifications do you need?"
			formName="hardware4"
			items={hardwareSpecs}
			bind:value={hardwareSpec}
			getValue={(i) => i.value}
		>
			{#snippet children(item)}
				<div class="grid grid-cols-4 items-center">
					<Text>{item.label}</Text>
					<Text small>{item.memorySizeInGB} GB RAM</Text>
					<Text small>{item.amountOfCores} CPUs</Text>
					<Text small>{item.storageSizeInGB} GB SSD Storage</Text>
				</div>
			{/snippet}
		</RadioButtons>
		<RadioButtons
			variant="cards"
			title="Server Configuration"
			subtitle="What hardware specifications do you need?"
			formName="hardware5"
			items={hardwareSpecs}
			bind:value={hardwareSpec}
			getValue={(i) => i.value}
		>
			{#snippet children(item)}
				<Text>{item.label}</Text>
				<Text small>{item.memorySizeInGB} GB RAM</Text>
				<Text small>{item.amountOfCores} CPUs</Text>
				<Text small>{item.storageSizeInGB} GB SSD Storage</Text>
			{/snippet}
		</RadioButtons>
		<RadioButtons
			variant="buttons"
			title="RAM"
			formName="hardware6"
			items={hardwareSpecs}
			bind:value={hardwareSpec}
			getValue={(i) => i.value}
		>
			{#snippet children(item)}
				{item.memorySizeInGB} GB
			{/snippet}
		</RadioButtons>
		<RadioButtons
			variant="stacked-cards"
			title="Server Configuration"
			subtitle="What hardware specifications do you need?"
			formName="hardware7"
			items={hardwareSpecs}
			bind:value={hardwareSpec}
			getValue={(i) => i.value}
		>
			{#snippet children(item)}
				<div class="flex items-center justify-between">
					<div>
						<Text>{item.label}</Text>
						<Text class="!text-sm">
							<span class="text-secondary">{item.memorySizeInGB} GB RAM /</span>
							<span class="text-secondary">{item.amountOfCores} CPUs /</span>
							<span class="text-secondary">{item.storageSizeInGB} GB SSD Storage</span>
						</Text>
					</div>
					<div class="text-end">
						<Text
							>{item.amountOfCores * 10 + item.memorySizeInGB * 5 + item.storageSizeInGB * 2}$</Text
						>
						<Text secondary class="!text-sm">/ mo</Text>
					</div>
				</div>
			{/snippet}
		</RadioButtons>
	</div>
</Story>

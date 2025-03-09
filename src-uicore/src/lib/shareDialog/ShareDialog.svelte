<script lang="ts">
	import { Button } from '../button/index.js';
	import { Icon, icons } from '../icon/index.js';
	import { Modal } from '../modal/index.js';
	import { Input } from '../input/index.js';

	let {
		title,
		value,
		visible = $bindable()
	}: {
		title: string;
		value: string;
		visible: boolean;
	} = $props();

	type ShareOption = {
		icon: Icon;
		label: string;
		action: () => void;
	};
	const options = [
		{
			icon: icons.controls.add,
			label: 'Facebook',
			action: () => console.log('Facebook ' + value)
		},
		{
			icon: icons.controls.add,
			label: 'Twitter',
			action: () => console.log('Twitter ' + value)
		},
		{
			icon: icons.controls.add,
			label: 'LinkedIn',
			action: () => console.log('LinkedIn ' + value)
		},
		{
			icon: icons.controls.add,
			label: 'Email',
			action: () => console.log('Email ' + value)
		}
	] as ShareOption[];

	function copy() {
		navigator.clipboard.writeText(value);
	}
</script>

<Button
	variant="integrated"
	label="Share"
	icon={icons.controls.dropdown}
	onclick={() => (visible = !visible)}
	class="share-button"
/>
<Modal bind:visible {title} class="share-modal">
	{#snippet body()}
		<div>
			{#each options as option}
				<Button icon={option.icon} label={option.label} onclick={option.action} hideLabel />
			{/each}
		</div>
		<Input {value}>
			<Button variant="form" label="Copy" icon={icons.controls.add} hideLabel onclick={copy} />
		</Input>
	{/snippet}
	{#snippet footer()}
		<Button variant="secondary" label="Close" onclick={() => (visible = false)} />
	{/snippet}
</Modal>

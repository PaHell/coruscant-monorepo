<script lang="ts">
	import './style.css';
	import { Button } from '../button/index.js';
	import { Icon, icons } from '../icon/index.js';

	let {
		value = $bindable(false),
		label,
		variant,
		onchange
	}: {
		value: boolean;
		label: string;
		variant: 'checkbox' | 'toggle';
		onchange?: (value: boolean) => unknown;
	} = $props();

	function toggle() {
		value = !value;
		onchange?.(value);
	}
</script>

<Button variant="integrated" {label} onclick={toggle} class="checkbox checkbox-variant-{variant}">
	{#snippet children()}
		<Icon name={icons.controls.dropdown} />
		<span>{label}</span>
	{/snippet}
</Button>

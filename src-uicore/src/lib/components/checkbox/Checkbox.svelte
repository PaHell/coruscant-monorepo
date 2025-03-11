<script lang="ts">
	import { Button } from '$lib/index.js';
	import { Icon, icons } from '$lib/index.js';

	let {
		value = $bindable(false),
		label,
		variant = 'default',
		onchange
	}: {
		value: boolean;
		label: string;
		variant?: 'default' | 'toggle';
		onchange?: (value: boolean) => unknown;
	} = $props();

	function toggle() {
		value = !value;
		onchange?.(value);
	}
</script>

<Button
	variant="integrated"
	{label}
	onclick={toggle}
	class="checkbox checkbox-variant-{variant} {value ? 'checkbox-checked' : ''}"
>
	{#snippet children()}
		<Icon name={icons.controls.checkmark} />
		{#if label}
			<span>{label}</span>
		{/if}
	{/snippet}
</Button>

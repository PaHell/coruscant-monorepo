<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		value = $bindable(false),
		name,
		label,
		variant = 'default',
		onchange,
		children
	}: {
		value: boolean;
		name: string;
		label?: string;
		variant?: 'default' | 'toggle';
		onchange?: (value: boolean) => unknown;
		children?: Snippet<[]>;
	} = $props();
</script>

<div class="checkbox checkbox-variant-{variant}">
	<input
		id="checkbox-{name}"
		type="checkbox"
		{name}
		value={true}
		bind:checked={value}
		onchange={(e) => onchange?.(e.target?.value)}
	/>
	<label for="checkbox-{name}">
		{label}
		{@render children?.()}
	</label>
</div>

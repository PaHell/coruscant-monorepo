<script lang="ts">
	import { type Snippet } from 'svelte';
	import { Icon, icons, Button, Heading } from '$lib/index.js';
	import type { HTMLAttributes, HTMLBaseAttributes } from 'svelte/elements';

	let {
		label,
		opened = $bindable(false),
		children,
		...others
	}: HTMLAttributes<HTMLDivElement> & {
		label: string;
		opened?: boolean;
		children: Snippet<[]>;
	} = $props();
</script>

<div class="accordion {others.class}" {...others}>
	<Button {label}>
		<Heading>{label}</Heading>
		<Icon name={icons.controls.dropdown} />
	</Button>
	{#if opened}
		<div>
			{@render children()}
		</div>
	{/if}
</div>

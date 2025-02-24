<script lang="ts">
	import { type Snippet } from 'svelte';
	import { Heading } from '../text/index.js';
	import { Icon, icons } from '../icon/index.js';
	import './style.css';
	import type { HTMLAttributes, HTMLBaseAttributes } from 'svelte/elements';
	import { Button } from '../button/index.js';

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

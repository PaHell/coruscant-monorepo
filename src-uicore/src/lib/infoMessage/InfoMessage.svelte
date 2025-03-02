<script lang="ts">
	import { type Snippet } from 'svelte';
	import './style.css';
	import type { HTMLAttributes } from 'svelte/elements';
	import { Button } from '../button/index.js';

	let {
		icon,
		label,
		expanded = false,
		variant = 'info',
		children,
		...others
	}: HTMLAttributes<HTMLDivElement> & {
		icon: string;
		label: string;
		expanded?: boolean;
		variant?: 'info' | 'success' | 'warning' | 'danger';
		children: Snippet<[]>;
	} = $props();
</script>

<div class="info-message info-message-variant-{variant} {others.class}" {...others}>
	<Button {icon} {label} />
	{#if expanded}
		<menu>
			{@render children()}
		</menu>
	{/if}
</div>

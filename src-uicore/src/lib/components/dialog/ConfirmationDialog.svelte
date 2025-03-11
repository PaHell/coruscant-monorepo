<script lang="ts">
	import { type Snippet } from 'svelte';
	import { Modal } from '$lib/index.js';
	import { Button } from '$lib/index.js';

	let {
		visible,
		title,
		confirm,
		cancel,
		variant = 'success',
		children
	}: {
		visible: boolean;
		title: string;
		confirm: string;
		cancel: string;
		variant?: 'success' | 'warning' | 'danger';
		children: Snippet<[]>;
	} = $props();
</script>

<Modal bind:visible {title} body={children} class="confirmation-dialog">
	{#snippet footer()}
		<Button variant="secondary" label={cancel} />
		<Button variant={variant === 'success' ? 'primary' : variant} label={confirm} />
	{/snippet}
</Modal>

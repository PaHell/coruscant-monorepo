<script lang="ts">
	import { type Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { Button, Heading, icons, clickOutside } from '$lib/index.js';

	type T = $$Generic;
	let {
		visible = $bindable(false),
		title,
		body,
		footer,
		...others
	}: HTMLAttributes<HTMLDivElement> & {
		visible: boolean;
		title: string;
		body: Snippet<[]>;
		footer: Snippet<[]>;
	} = $props();
</script>

{#if visible}
	<div class="modal {others.class}" {...others}>
		<menu use:clickOutside={() => (visible = false)}>
			<header>
				<Heading level={6}>{title}</Heading>
				<Button
					variant="integrated"
					icon={icons.controls.close}
					label="Close"
					hideLabel
					onclick={() => (visible = false)}
				/>
			</header>
			<main>
				{@render body()}
			</main>
			<footer>
				{@render footer()}
			</footer>
		</menu>
	</div>
{/if}

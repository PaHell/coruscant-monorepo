<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import type { HTMLMenuAttributes } from 'svelte/elements';
	import { flip, computePosition, type ComputePositionConfig } from '@floating-ui/dom';
	import './style.css';
	import debounce from '../utils/debounce.js';
	import { clickOutside } from '../utils/use.js';
	import { Button } from '../button/index.js';
	import { Heading, Text } from '../text/index.js';
	import { icons } from '../icon/index.js';

	type T = $$Generic;
	let {
		visible = $bindable(false),
		id,
		class: classes,
		title,
		body,
		footer
	}: {
		visible: boolean;
		id?: string;
		class?: string;
		title: string;
		body: Snippet<[]>;
		footer: Snippet<[]>;
	} = $props();
</script>

{#if visible}
	<div {id} class="modal">
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
			<main class={classes}>
				{@render body()}
			</main>
			<footer>
				{@render footer()}
			</footer>
		</menu>
	</div>
{/if}

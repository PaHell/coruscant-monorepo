<script lang="ts">
	import { onMount } from 'svelte';
	import { computePosition, autoPlacement } from '@floating-ui/dom';
	import { debounce } from '$lib/index.js';
	import type { HTMLMenuAttributes } from 'svelte/elements';
	import { Heading } from '$lib/index.js';
	import { Text } from '$lib/index.js';
	import { Button } from '$lib/index.js';

	let {
		hidden = $bindable(false),
		active,
		steps,
		...others
	}: HTMLMenuAttributes & {
		hidden?: boolean;
		active: number;
		steps: {
			selector: string;
			title: string;
			content: string;
		}[];
	} = $props();
	let refMenu: HTMLMenuElement | undefined = $state(undefined);
	let menuStyle = $state('');

	onMount(calculate);
	$effect(calculate);

	const debouncedCalculate = debounce(calculate, 100);

	function calculate() {
		if (!steps[active] || !refMenu || hidden) return;
		const trigger = document.querySelector(steps[active].selector);
		if (!trigger) return;
		computePosition(trigger, refMenu, {
			placement: 'bottom-start',
			strategy: 'fixed',
			middleware: [autoPlacement()]
		}).then((res) => {
			menuStyle += `
				top: ${res.y}px;
				left: ${res.x}px;
				position: ${res.strategy};
			`;
		});
	}

	function previous() {
		if (active === 0) return;
		active -= 1;
		calculate();
	}

	function next() {
		if (active < steps.length - 1) {
			active += 1;
			calculate();
		} else hidden = true;
	}
</script>

<svelte:window on:resize={debouncedCalculate} on:scroll={debouncedCalculate} />

<menu
	bind:this={refMenu}
	class:hidden
	class="tutorial floating-menu {others.class}"
	style={menuStyle}
	{...others}
>
	{#if steps[active]}
		<Heading level={2}>{steps[active].title}</Heading>
		<Text>{steps[active].content}</Text>
		<footer>
			<Text>{active + 1}/{steps.length}</Text>
			<Button label="Previous" onclick={previous} disabled={active === 0} />
			<Button
				label={active === steps.length - 1 ? 'Finish' : 'Next'}
				onclick={next}
				disabled={active === steps.length - 1}
			/>
		</footer>
	{/if}
</menu>

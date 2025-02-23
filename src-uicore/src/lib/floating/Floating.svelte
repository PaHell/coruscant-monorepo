<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { flip, computePosition, type ComputePositionConfig } from '@floating-ui/dom';
	import './style.css';
	import debounce from '../utils/debounce.js';
	import { clickOutside } from '../utils/use.js';

	type T = $$Generic;
	let {
		hidden = false,
		class: classes,
		trigger,
		menu,
		...others
	}: ComputePositionConfig & {
		hidden?: boolean;
		class?: string;
		trigger: Snippet<
			[
				{
					open: () => void;
					close: () => void;
					toggle: () => void;
				}
			]
		>;
		menu: Snippet<[]>;
	} = $props();
	const minWidth = 200;
	const minHeight = 96;
	let refContainer: HTMLDivElement | undefined = $state(undefined);
	let refMenu: HTMLMenuElement | undefined = $state(undefined);
	let menuStyle = $state('');

	onMount(calculate);
	$effect(calculate);

	const debouncedCalculate = debounce(calculate, 100);

	function calculate() {
		if (!refContainer || !refMenu || hidden) return;
		const trigger = refContainer.children[0];
		const rect = trigger.getBoundingClientRect();
		if (others.placement?.startsWith('top') || others.placement?.startsWith('bottom')) {
			menuStyle = `width: ${Math.max(rect.width, minWidth)}px;`;
		} else {
			menuStyle = `height: ${Math.max(rect.height, minHeight)}px;`;
		}
		computePosition(trigger, refMenu, {
			strategy: others.strategy ?? 'absolute',
			middleware: [flip()],
			...others
		}).then((res) => {
			menuStyle += `
				top: ${res.y}px;
				left: ${res.x}px;
				position: ${res.strategy};
			`;
		});
	}

	const setHidden = (value: boolean) => (hidden = value);

	function onClickOutside(event: MouseEvent) {
		const trigger = refContainer?.children[0];
		if (!trigger?.contains(event.target)) setHidden(true);
	}
</script>

<svelte:window on:resize={debouncedCalculate} on:scroll={debouncedCalculate} />

<div bind:this={refContainer} class="floating">
	{@render trigger({
		open: () => setHidden(false),
		close: () => setHidden(true),
		toggle: () => setHidden(!hidden)
	})}
	<menu
		bind:this={refMenu}
		class:hidden
		class="floating-menu floating-menu-{others.placement} {classes}"
		style={menuStyle}
		use:clickOutside={onClickOutside}
	>
		{@render menu()}
	</menu>
</div>

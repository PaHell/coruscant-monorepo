<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import {
		flip,
		computePosition,
		type ComputePositionConfig,
		type Middleware,
		type Placement,
		type Platform,
		type Strategy
	} from '@floating-ui/dom';
	import { debounce, clickOutside } from '$lib/index.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		hidden = $bindable(false),
		id,
		trigger,
		menu,
		placement,
		strategy,
		middleware,
		platform,
		...others
	}: ComputePositionConfig &
		HTMLAttributes<HTMLDivElement> & {
			hidden?: boolean;
			placement?: Placement | undefined;
			strategy?: Strategy | undefined;
			middleware?: Array<Middleware | null | undefined | false> | undefined;
			platform?: Platform | undefined;
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

	const debouncedCalculate = debounce(calculate, 100);
	onMount(calculate);
	$effect(calculate);

	function calculate() {
		if (!refContainer || !refMenu || hidden) return;
		const trigger = refContainer.children[0];
		const rect = trigger.getBoundingClientRect();
		if (placement?.startsWith('top') || placement?.startsWith('bottom')) {
			menuStyle = `width: ${Math.max(rect.width, minWidth)}px;`;
		} else {
			menuStyle = `height: ${Math.max(rect.height, minHeight)}px;`;
		}
		computePosition(trigger, refMenu, {
			placement,
			strategy: strategy ?? 'absolute',
			middleware: [flip()]
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

<div bind:this={refContainer} {...others} class="floating {others.class}">
	{@render trigger({
		open: () => setHidden(false),
		close: () => setHidden(true),
		toggle: () => setHidden(!hidden)
	})}
	<menu
		bind:this={refMenu}
		{id}
		class:hidden
		class="floating-menu floating-menu-{placement}"
		style={menuStyle}
		use:clickOutside={onClickOutside}
	>
		{@render menu()}
	</menu>
</div>

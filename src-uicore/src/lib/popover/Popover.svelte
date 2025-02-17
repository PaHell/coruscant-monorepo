<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLMenuAttributes } from 'svelte/elements';
	import './style.css';

	type T = $$Generic;
	let {
		position,
		trigger,
		menu,
		...others
	}: HTMLMenuAttributes & {
		position: 'top' | 'bottom' | 'left' | 'right';
		trigger: Snippet<[]>;
		menu: Snippet<[]>;
	} = $props();

	let ref: HTMLDivElement | undefined = $state(undefined);
	let menuStyle = $derived(() => {
		if (!ref) return '';
		const rect = ref.children[0].getBoundingClientRect();
		switch (position) {
			case 'top':
				return `bottom: ${window.innerHeight - rect.top}px; left: ${rect.left}px; width: ${rect.width}px;`;
			case 'bottom':
				return `top: ${rect.top + rect.height}px; left: ${rect.left}px; width: ${rect.width}px;`;
			case 'left':
				return `top: ${rect.top}px; left: ${rect.right}px;`;
			case 'right':
				return `top: ${rect.top}px; right: ${window.innerWidth - rect.left}px;`;
			default:
				return '';
		}
	});
</script>

<div bind:this={ref} class="popover {others.class}">
	{@render trigger()}
	<menu class="popover-menu popover-menu-{position}" style={menuStyle()}>
		{@render menu()}
	</menu>
</div>

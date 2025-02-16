<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLMenuAttributes } from 'svelte/elements';
	import './style.css';

	type T = $$Generic;
	let {
		connectedTo,
		position,
		children,
		...others
	}: HTMLMenuAttributes & {
		connectedTo: HTMLElement;
		position: 'top' | 'bottom' | 'left' | 'right';
		children?: Snippet<[]>;
	} = $props();
</script>

<menu class="popover {others.class}">
	{@render children?.()}
</menu>

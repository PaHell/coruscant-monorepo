<script lang="ts">
	import { Button, Icon, icons, Navigation } from '$lib/index.js';
	import type { HTMLAttributes } from 'svelte/elements';

	type T = $$Generic;
	let {
		items,
		pathSelector,
		textSelector,
		onchange,
		...others
	}: HTMLAttributes<HTMLDivElement> & {
		items: T[];
		pathSelector: (item: T) => string;
		textSelector: (item: T) => string;
		class: string;
		onchange: (item: T, index: number) => unknown;
	} = $props();

	let active = $state(0);
</script>

<div {...others} class="breadcrumbs {others.class}">
	<Navigation {items} {pathSelector} {onchange} bind:active>
		{#snippet children({ item, href, active, index })}
			<Button variant="integrated" {href} {active} label={textSelector(item)}>
				<span>{textSelector(item)}</span>
				{#if index !== items.length - 1}
					<span class="icon">
						<Icon name={icons.controls.dropdown} />
					</span>
				{/if}
			</Button>
		{/snippet}
	</Navigation>
</div>

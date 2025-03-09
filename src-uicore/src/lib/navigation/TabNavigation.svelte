<script lang="ts">
	import { Button, Navigation, type NavigationProperties } from '$lib/index.js';
	import type { HTMLAttributes } from 'svelte/elements';

	type T = $$Generic;
	let {
		items,
		pathSelector,
		textSelector,
		match = 0,
		matchQuery,
		variant,
		onchange,
		...others
	}: HTMLAttributes<HTMLDivElement> &
		NavigationProperties<T> & {
			variant: 'option-bar' | 'tabs';
			textSelector: (item: T) => string;
		} = $props();

	let active = $state(0);
	let offsetLeft = $state(0);
	let width = $state(0);
	$effect(() => {
		const offsetParent = refRoot?.getBoundingClientRect().left ?? 0;
		const tabRect = refRoot
			?.querySelector(`.tab:nth-child(${active + 1})`)
			?.getBoundingClientRect();
		offsetLeft = tabRect ? tabRect.left - offsetParent : 0;
		width = tabRect ? tabRect.width : 0;
	});
	let refRoot: HTMLDivElement | undefined = $state(undefined);
</script>

<div
	bind:this={refRoot}
	{...others}
	class="tab-navigation tab-navigation-variant-{variant} {others.class}"
>
	<div class="indicator" style="width: {width}px; left: {offsetLeft}px;"><div></div></div>
	<Navigation {items} {pathSelector} {match} {matchQuery} {onchange} bind:active>
		{#snippet children({ item, href, active })}
			<div class="tab">
				<Button variant="integrated" {href} {active} label={textSelector(item)} />
			</div>
		{/snippet}
	</Navigation>
</div>

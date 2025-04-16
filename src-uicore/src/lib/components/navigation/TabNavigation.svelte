<script lang="ts">
	import {
		Badge,
		Button,
		Link,
		Navigation,
		type ButtonProperties,
		type NavigationProperties
	} from '$lib/index.js';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type T = $$Generic;
	let {
		items,
		pathSelector,
		textSelector,
		match = 0,
		matchQuery,
		badgeValueSelector,
		variant,
		fullWidth = false,
		onchange,
		children: _children,
		...others
	}: Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
		NavigationProperties<T> & {
			badgeValueSelector?: (item: T) => number | string | null;
			variant: 'tabs' | 'pills' | 'bar';
			fullWidth?: boolean;
			textSelector: (item: T) => string;
			children: Snippet<
				[
					{
						item: T;
						href: string;
						active: boolean;
						index: number;
					}
				]
			>;
		} = $props();

	let active = $state(0);
	let offsetLeft = $state(0);
	let width = $state(0);
	$effect(() => {
		const offsetParent = refRoot?.getBoundingClientRect().left ?? 0;
		const tabRect = refRoot
			?.querySelector(`.tab-navigation-content > .button:nth-child(${active + 1})`)
			?.getBoundingClientRect();
		offsetLeft = tabRect ? tabRect.left - offsetParent : 0;
		width = tabRect ? tabRect.width : 0;
	});
	let refRoot: HTMLDivElement | undefined = $state(undefined);

	const variantButtonClassMap = {
		tabs: 'integrated',
		pills: 'integrated',
		bar: 'secondary'
	} satisfies Record<typeof variant, ButtonProperties['variant']>;
</script>

<div
	bind:this={refRoot}
	{...others}
	class:tab-navigation-full={fullWidth}
	class="tab-navigation tab-navigation-variant-{variant} {others.class}"
>
	<div class="indicator" style="width: {width}px; left: {offsetLeft}px;"><div></div></div>
	<div class="tab-navigation-content">
		<Navigation {items} {pathSelector} {match} {matchQuery} {onchange} bind:active>
			{#snippet children({ item, href, active, index })}
				<Link variant={variantButtonClassMap[variant]} {href} {active} value={textSelector(item)}>
					{@render _children({ item, href, active, index })}
					{#if badgeValueSelector}
						<Badge label={badgeValueSelector(item).toString()} />
					{/if}
				</Link>
			{/snippet}
		</Navigation>
	</div>
</div>

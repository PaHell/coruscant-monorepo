<script lang="ts">
	import { browser } from '$app/environment';
	import { afterNavigate } from '$app/navigation';
	import type { Snippet } from 'svelte';
	import { matchPath, type NavigationProperties } from './index.js';

	type T = $$Generic;
	let {
		items,
		pathSelector,
		match = 0,
		matchQuery,
		active = $bindable(-1),
		onchange,
		children
	}: NavigationProperties<T> & {
		children: Snippet<
			[
				{
					item: T;
					active: boolean;
					href: string;
				}
			]
		>;
	} = $props();

	let paths: string[] = $derived(items.map(pathSelector));
	$effect(onNavigate);
	let currentPath = '';

	afterNavigate(onNavigate);

	function onNavigate() {
		if (!browser) return;
		currentPath = window.location.pathname + window.location.search;
		active = paths.findIndex((path) => matchPath(path, currentPath, match, matchQuery));
		onchange?.(items[active], active);
	}
</script>

{#each items as item, i (i)}
	{@render children({ item, active: i == active, href: paths[i] })}
{/each}

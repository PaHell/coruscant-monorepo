<script lang="ts">
	import Button from '$lib/button/Button.svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { Icon, icons } from '../icon/index.js';
	import Navigation from './Navigation.svelte';

	type SideNavigationItem = {
		icon: string;
		label: string;
	};

	type WithUrl = {
		href: string;
		match?: number;
	};

	type WithChildren = {
		children: (SideNavigationItem & WithUrl)[];
	};

	let {
		items,
		match = 0,
		onchange,
		...others
	}: HTMLAttributes<HTMLDivElement> & {
		items: ((SideNavigationItem & WithUrl) | (SideNavigationItem & WithChildren))[];
		match?: number;
		class: string;
		onchange?: (item: SideNavigationItem & WithUrl) => unknown;
	} = $props();

	let active = $state(0);
	let expandedParent = $state<number | null>(null);
</script>

<div {...others} class="side-navigation {others.class}">
	<Navigation {items} pathSelector={(i) => i.href ?? ''} {match} {onchange} bind:active>
		{#snippet children({ item, href, active, index })}
			{#if 'children' in item}
				<Button
					variant="integrated"
					active={expandedParent === index}
					label={item.label}
					onclick={() => (expandedParent = expandedParent === index ? null : index)}
				>
					<Icon name={item.icon} />
					<span>{item.label}</span>
					<Icon name={icons.controls.add} />
				</Button>
				{#if expandedParent === index}
					<Navigation items={item.children} pathSelector={(i) => i.href} {match} {onchange}>
						{#snippet children({ item, href, active })}
							<Button variant="integrated" {href} {active} icon={item.icon} label={item.label} />
						{/snippet}
					</Navigation>
				{/if}
			{:else}
				<Button variant="integrated" {href} {active} icon={item.icon} label={item.label} />
			{/if}
		{/snippet}
	</Navigation>
</div>

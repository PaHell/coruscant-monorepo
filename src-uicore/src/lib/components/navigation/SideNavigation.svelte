<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import {
		Navigation,
		Button,
		Icon,
		icons,
		Link,
		Badge,
		type SideNavigationItem,
		type BaseBadgeProperties
	} from '$lib/index.js';

	type Properties = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
		items: SideNavigationItem[];
		match?: number;
		badgeColor?: BaseBadgeProperties['color'];
		onchange?: (item: SideNavigationItem) => unknown;
	};
	let { items, match = 0, badgeColor = 'blue', onchange, ...others }: Properties = $props();

	let active = $state(0);
	let expandedParent = $state<number | null>(null);
</script>

<div {...others} class="side-navigation {others.class}">
	<Navigation
		{items}
		pathSelector={(i) => ('href' in i ? i.href : '')}
		{match}
		{onchange}
		bind:active
	>
		{#snippet children({ item, href, active, index })}
			{#if 'children' in item}
				<Button
					variant="integrated"
					size="lg"
					active={expandedParent === index}
					value={item.label}
					onclick={() => (expandedParent = expandedParent === index ? null : index)}
				>
					<Icon name={item.icon} />
					<span>{item.label}</span>
					<Icon name={icons.controls.dropdown} />
				</Button>
				{#if expandedParent === index}
					<menu>
						<Navigation items={item.children} pathSelector={(i) => i.href} {match} {onchange}>
							{#snippet children({ item, href, active })}
								<Link
									variant="integrated"
									size="lg"
									{href}
									{active}
									icon={item.icon}
									value={item.label}
								>
									<Icon name={item.icon} />
									<span>{item.label}</span>
									{#if item.badge}
										<Badge
											color={badgeColor}
											variant={active ? 'border' : 'flat'}
											label={item.badge?.toString()}
										/>
									{/if}
								</Link>
							{/snippet}
						</Navigation>
					</menu>
				{/if}
			{:else}
				<Link
					variant={active ? 'secondary' : 'integrated'}
					size="lg"
					{href}
					{active}
					icon={item.icon}
					value={item.label}
				>
					<Icon name={item.icon} />
					<span>{item.label}</span>
					{#if item.badge}
						<Badge
							color={badgeColor}
							variant={active ? 'border' : 'flat'}
							label={item.badge?.toString()}
						/>
					{/if}
				</Link>
			{/if}
		{/snippet}
	</Navigation>
</div>

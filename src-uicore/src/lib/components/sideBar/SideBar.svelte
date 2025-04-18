<script lang="ts">
	import { type Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { Button, icons, Link } from '$lib/index.js';

	type Properties = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
		variant: 'theme' | 'accent' | 'dark';
		logoSrc: string;
		name: string;
		hrefHome?: string;
		collapsed?: boolean;
		collapsable?: boolean;
		body: Snippet<
			[
				{
					collapsed: boolean;
				}
			]
		>;
		footer: Snippet<
			[
				{
					collapsed: boolean;
				}
			]
		>;
	};
	let {
		variant,
		logoSrc,
		name,
		hrefHome = '/',
		collapsed = $bindable(),
		collapsable = false,
		body,
		footer,
		...others
	}: Properties = $props();
</script>

<aside
	{...others}
	class="sidebar sidebar-variant-{variant} {others.class}"
	class:dark={variant !== 'theme'}
	class:sidebar-collapsed={collapsed}
>
	<header>
		<Link variant="integrated" size="lg" href={hrefHome} value={name}>
			<img src={logoSrc} alt="Logo of {name}" />
			<span>{name}</span>
		</Link>
		{#if collapsable}
			<Button
				variant="integrated"
				size="lg"
				icon={collapsed ? icons.controls.add : icons.controls.close}
				value={collapsed ? 'Expand' : 'Collapse'}
				hideValue
				onclick={() => (collapsed = !collapsed)}
			/>
		{/if}
	</header>
	<main>
		{@render body({ collapsed: collapsed ?? false })}
	</main>
	<footer>
		{@render footer({ collapsed: collapsed ?? false })}
	</footer>
</aside>

<script lang="ts">
	import { Heading, Link, TabNavigation } from '$lib/index.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import { UserAvatar } from '$lib/index.js';
	import { Navigation } from '$lib/index.js';

	type Properties = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
		variant: 'theme' | 'accent' | 'dark';
		overlap: boolean;
		appName: string;
		logoSrc: string;
		hrefHome: string;
		userName: string;
		userAvatar: string | null | undefined;
		navigation: { label: string; href: string }[];
		links: { label: string; href: string }[];
	};

	let {
		variant,
		overlap,
		appName,
		logoSrc,
		hrefHome,
		userName,
		userAvatar,
		navigation,
		links,
		...others
	}: Properties = $props();
</script>

<header
	{...others}
	class="header header-variant-{variant} {others.class}"
	class:header-overlap={overlap}
>
	<Link variant="integrated" href="/" value="Goto home" class="branding">
		<img src={logoSrc} alt={appName} />
		<Heading level={5}>{appName}</Heading>
	</Link>
	<nav>
		<TabNavigation
			variant="pills"
			items={navigation}
			pathSelector={(i) => i.href}
			textSelector={(i) => i.label}
		>
			{#snippet children({ item })}
				{item.label}
			{/snippet}
		</TabNavigation>
	</nav>
	<div class="links">
		<Navigation items={links} pathSelector={(i) => i.href}>
			{#snippet children({ href, item })}
				<Link variant="link" {href} value={item.label} />
			{/snippet}
		</Navigation>
		<UserAvatar size="sm" label={userName} src={userAvatar} />
	</div>
</header>

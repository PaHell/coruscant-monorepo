<script lang="ts">
	import { Heading } from '../text/index.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import { Button } from '../button/index.js';
	import { UserAvatar } from '../userAvatar/index.js';
	import { Navigation } from '../navigation/index.js';

	let {
		appName,
		logoSrc,
		userName,
		userAvatar,
		navigation,
		links,
		...others
	}: HTMLAttributes<HTMLElement> & {
		appName: string;
		logoSrc: string;
		userName: string;
		userAvatar: string | null | undefined;
		navigation: { label: string; href: string }[];
		links: { label: string; href: string }[];
	} = $props();
</script>

<header {...others} class="header {others.class}">
	<Button href="/" label="Goto home" class="branding">
		<img src={logoSrc} alt={appName} />
		<Heading level={5}>{appName}</Heading>
	</Button>
	<nav>
		<Navigation items={navigation} pathSelector={(i) => i.href}>
			{#snippet children({ href, item })}
				<Button variant="integrated" {href} label={item.label} />
			{/snippet}
		</Navigation>
	</nav>
	<div class="links">
		<Navigation items={links} pathSelector={(i) => i.href}>
			{#snippet children({ href, item })}
				<Button variant="link" {href} label={item.label} />
			{/snippet}
		</Navigation>
		<UserAvatar label={userName} src={userAvatar} />
	</div>
</header>

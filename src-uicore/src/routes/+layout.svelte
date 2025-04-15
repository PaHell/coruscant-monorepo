<script lang="ts">
	import TabNavigation from '$lib/components/navigation/TabNavigation.svelte';
	import '../app.css';

	let { children: _children } = $props();

	type NavigationItem = { label: string; href: string };
	let items: NavigationItem[] = [
		{ label: 'Home', href: '/' },
		{ label: 'Floating', href: '/floating' },
		{ label: 'Modal', href: '/modal' }
	];
</script>

<nav class="bg-foreground border-border border-b p-6">
	<TabNavigation variant="tabs" {items} pathSelector={(i) => i.href} textSelector={(i) => i.label}>
		{#snippet children({ item })}
			{item.label}
		{/snippet}
	</TabNavigation>
</nav>
<main class="bg-background p-6">
	{@render _children()}
</main>

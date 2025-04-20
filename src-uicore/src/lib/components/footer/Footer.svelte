<script lang="ts">
	import { Link, Text } from '$lib/index.js';
	import type { HTMLAttributes } from 'svelte/elements';

	type Properties = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
		copyright: string;
		links: { label: string; href: string }[];
	};

	let { copyright, links, ...others }: Properties = $props();
</script>

<footer {...others} class="footer {others.class}">
	<Text small>{copyright}</Text>
	{#each links as { label, href }}
		<Link variant="link" size="sm" {href} value={label} />
	{/each}
</footer>

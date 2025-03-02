<script lang="ts">
	import { Text } from '../text/index.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import { Button } from '../button/index.js';
	import './style.css';

	let {
		copyright,
		links,
		...others
	}: HTMLAttributes<HTMLElement> & {
		copyright: string;
		links: { label: string; href: string }[];
	} = $props();
</script>

<footer {...others} class="footer {others.class}">
	<Text>{copyright}</Text>
	{#each links as { label, href }}
		<Button {href} {label} />
	{/each}
</footer>

<script lang="ts">
	import { Heading, Text } from '$lib/index.js';
	import type { HTMLAttributes, HTMLBaseAttributes } from 'svelte/elements';

	let {
		size = 'medium',
		src,
		label,
		hideLabel,
		...others
	}: HTMLAttributes<HTMLDivElement> & {
		size?: 'small' | 'medium' | 'large';
		src: string | null | undefined;
		label: string;
		hideLabel?: boolean;
	} = $props();

	const headingLevel = $derived(() => {
		switch (size) {
			case 'small':
				return 6;
			case 'medium':
				return 4;
			case 'large':
				return 2;
		}
	});
</script>

<div {...others} class="user-avatar user-avatar-{size} {others.class}">
	<div>
		{#if src}
			<img {src} alt={label} />
		{:else}
			<Heading level={headingLevel()}>{label[0]}</Heading>
		{/if}
	</div>
	{#if !hideLabel}
		<Text>{label}</Text>
	{/if}
</div>

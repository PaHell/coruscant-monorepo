<script lang="ts">
	import { Heading, Text } from '$lib/index.js';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes, HTMLBaseAttributes } from 'svelte/elements';

	let {
		size = 'md',
		src,
		label,
		header,
		subtitle,
		hideLabel,
		...others
	}: HTMLAttributes<HTMLDivElement> & {
		size?: 'xs' | 'sm' | 'md' | 'lg';
		src: string | null | undefined;
		label: string;
		header?: Snippet<[]>;
		subtitle?: Snippet<[]>;
		hideLabel?: boolean;
	} = $props();

	let headingLevel: undefined | 1 | 2 | 3 | 4 | 5 | 6 = $state();
	$effect(() => {
		switch (size) {
			case 'xs':
				headingLevel = undefined;
				break;
			case 'sm':
				headingLevel = 6;
				break;
			case 'md':
				headingLevel = 4;
				break;
			case 'lg':
				headingLevel = 2;
				break;
		}
	});

	const initials = $derived(
		label
			.split(' ')
			.map((word) => word[0].toUpperCase())
			.join('')
			.slice(0, 2)
	);

	const colors = [
		'red',
		'green',
		'blue',
		'yellow',
		'purple',
		'pink',
		'indigo',
		'cyan',
		'teal',
		'orange'
	];

	const color = $derived(
		colors[
			[...initials].map((char) => char.charCodeAt(0)).reduce((acc, val) => acc + val, 0) %
				colors.length
		]
	);
</script>

<div
	{...others}
	class="user-avatar user-avatar-size-{size} user-avatar-color-{color} {others.class}"
>
	<div class="user-avatar-image">
		{#if src}
			<img {src} alt={label} />
		{:else if headingLevel}
			<Heading level={headingLevel}>{initials}</Heading>
		{:else}
			<Text small>{initials}</Text>
		{/if}
	</div>
	<div class="user-avatar-details">
		{#if !hideLabel}
			<div>
				{#if headingLevel}
					<Heading level={headingLevel}>{label}</Heading>
				{:else}
					<Text small>{label}</Text>
				{/if}
				{@render header?.()}
			</div>
			{#if subtitle}
				<div>
					{@render subtitle()}
				</div>
			{/if}
		{/if}
	</div>
</div>

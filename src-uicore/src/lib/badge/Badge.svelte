<script lang="ts">
	import { type Snippet } from 'svelte';
	import { Text } from '../text/index.js';
	import './style.css';
	import { Button, type ButtonProperties } from '../button/index.js';

	let {
		variant = 'primary',
		active = false,
		children,
		...others
	}: ButtonProperties & {
		variant?: 'primary' | 'warning' | 'danger';
		active?: boolean;
		children: Snippet<[]>;
	} = $props();
</script>

<Button class="badge badge-variant-{variant} {others.class}" {...others}>
	<Text small>{@render children()}</Text>
</Button>

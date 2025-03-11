<script lang="ts">
	import { Heading, Text } from '$lib/index.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import { Button } from '$lib/index.js';

	let {
		code,
		title,
		content,
		...others
	}: HTMLAttributes<HTMLDivElement> & {
		code: number;
		title: string;
		content: string;
	} = $props();

	function reload() {
		location.reload();
	}
</script>

<div class="error-page {others.class}" {...others}>
	<div>
		<Heading level={1}>{code}</Heading>
		<Heading level={5}>{title}</Heading>
		<Text class="content">{content}</Text>
		<footer>
			<Button onclick={reload} label="Reload" />
		</footer>
	</div>
</div>

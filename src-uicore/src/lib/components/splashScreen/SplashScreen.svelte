<script lang="ts">
	import { Heading, Text } from '$lib/index.js';

	let {
		src,
		alt,
		label,
		copyright
	}: {
		src: string;
		alt: string;
		label: string;
		copyright: string;
	} = $props();
</script>

<div class="splash-screen">
	<div>
		<main>
			<img {src} {alt} />
			<Heading level={1}>{label}</Heading>
		</main>
		<footer>
			<Text>{copyright}</Text>
		</footer>
	</div>
</div>

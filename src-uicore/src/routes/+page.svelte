<script lang="ts">
	import Button from '$lib/button/Button.svelte';
	import Heading from '$src/lib/text/Heading.svelte';
	import { Floating } from '$src/lib/floating/index.js';
	import type { Placement } from '@floating-ui/dom';

	let placement: Placement = $state('bottom-start');

	function randomPlacement() {
		placement =
			['top', 'right', 'bottom', 'left'][Math.floor(Math.random() * 4)] +
			['-start', '-end', '', ''][Math.floor(Math.random() * 4)];
	}
</script>

<Heading level={1}>Welcome to your library project</Heading>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<Button href="https://svelte.dev/docs/kit" label="Lorem" variant="primary" />

<Floating {placement}>
	{#snippet trigger({ toggle })}
		<Button
			label={placement}
			class="mx-auto my-24 w-32"
			onclick={(evt) => {
				evt.preventDefault();
				randomPlacement();
				toggle();
			}}
		/>
	{/snippet}
	{#snippet menu()}
		<Heading level={2}>Menu</Heading>
	{/snippet}
</Floating>

<script lang="ts">
	import { Button, Heading, Floating, icons } from '$lib/index.js';
	import type { Placement } from '@floating-ui/dom';

	let placement: Placement = $state('bottom-start');

	function randomPlacement() {
		placement =
			['top', 'right', 'bottom', 'left'][Math.floor(Math.random() * 4)] +
			['-start', '-end', '', ''][Math.floor(Math.random() * 4)];
	}
</script>

<Floating {placement}>
	{#snippet trigger({ open })}
		<Button
			icon={icons.controls.add}
			label={placement}
			class="m-48"
			onclick={(evt) => {
				evt.preventDefault();
				randomPlacement();
				open();
			}}
		/>
	{/snippet}
	{#snippet menu()}
		<Heading level={2}>Menu</Heading>
	{/snippet}
</Floating>

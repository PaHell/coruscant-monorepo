<script lang="ts">
	import { type Snippet } from 'svelte';
	import { icons } from '$lib/index.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import { Button } from '$lib/index.js';

	let {
		value = $bindable(),
		levels = 5,
		...others
	}: HTMLAttributes<HTMLDivElement> & {
		value: number;
		levels?: number;
	} = $props();
</script>

<div class="rating {others.class}" {...others}>
	{#each Array(levels) as _, index}
		<Button
			icon={icons.controls.add}
			label={'Rate ' + (index + 1).toString()}
			active={index < value}
			onclick={() => (value = index + 1)}
			hideLabel
		/>
	{/each}
</div>

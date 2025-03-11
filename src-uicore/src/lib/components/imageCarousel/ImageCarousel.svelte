<script lang="ts">
	import { Button } from '$lib/index.js';
	import { Icon, icons } from '$lib/index.js';
	import { onDestroy } from 'svelte';

	type T = $$Generic;
	let {
		items = $bindable(),
		getSrc,
		getAlt,
		hideFooter = false,
		onchange
	}: {
		items: T[];
		getSrc: (item: T) => string;
		getAlt: (item: T) => string;
		hideFooter?: boolean;
		onchange?: (item: T | undefined, index: number) => unknown;
	} = $props();

	let delay = 5000;
	let activeIndex = $state(-1);

	let interval: number | undefined;

	onDestroy(() => {
		if (interval) clearInterval(interval);
	});

	function restartInterval() {
		if (interval) clearInterval(interval);
		interval = setInterval(next, delay);
	}

	function set(index: number) {
		activeIndex = index;
		restartInterval();
		onchange?.(items[activeIndex], activeIndex);
	}

	function next() {
		set(activeIndex < items.length - 1 ? activeIndex + 1 : 0);
	}

	function previous() {
		set(activeIndex > 0 ? activeIndex - 1 : items.length - 1);
	}
</script>

<div class="image-carousel">
	<main>
		<Button variant="integrated" label="Previous" onclick={previous} hideLabel />
		<div>
			<img src={getSrc(items[activeIndex])} alt={getAlt(items[activeIndex])} />
		</div>
		<Button variant="integrated" label="Next" onclick={next} hideLabel />
	</main>
	{#if !hideFooter}
		<footer>
			{#each items as item, i (i)}
				<Button
					variant="integrated"
					label={getAlt(item)}
					onclick={() => set(i)}
					active={i === activeIndex}
				>
					<img src={getSrc(item)} alt={getAlt(item)} />
				</Button>
			{/each}
		</footer>
	{/if}
</div>

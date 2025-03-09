<script lang="ts">
	import { Button } from '../button/index.js';
	import { type Snippet, setContext } from 'svelte';
	import type { WizardStepProperties, WizardSteps, WizardStepsStore } from './index.js';
	import { get, writable } from 'svelte/store';

	let {
		active = $bindable(null),
		children
	}: {
		active: string | number | null;
		children: Snippet<[]>;
	} = $props();

	let steps: WizardStepsStore = (function () {
		let { subscribe, update } = writable<WizardSteps>({});
		return {
			subscribe,
			set: (key: string | number, value: WizardStepProperties) =>
				update((steps) => ({ ...steps, [key]: value }))
		};
	})();

	setContext<WizardStepsStore>('wizard', steps);

	function next() {
		const keys = Object.keys(get(steps));
		const index = keys.indexOf(active as string);
		if (index < keys.length - 1) {
			active = keys[index + 1];
		}
	}

	function previous() {
		const keys = Object.keys(get(steps));
		const index = keys.indexOf(active as string);
		if (index > 0) {
			active = keys[index - 1];
		}
	}
</script>

<div class="wizard">
	{@render children()}
	<nav>
		{#each Object.entries($steps) as [key, step]}
			<Button
				icon={step.icon}
				label={step.label}
				active={key === active}
				onclick={() => (active = key)}
			/>
		{/each}
	</nav>
	<main>
		{#if active !== null}
			{@render $steps[active].children()}
		{/if}
	</main>
	<footer>
		<Button label="Previous" disabled={!active} onclick={previous} />
		{#if active !== null && active !== Object.keys($steps).length - 1}
			<Button label="Next" onclick={next} disabled={$steps[active].valid} />
		{/if}
	</footer>
</div>

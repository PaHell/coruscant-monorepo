<script lang="ts">
	import { Button } from '$lib/index.js';
	import { Floating } from '$lib/index.js';
	import { Icon, icons } from '$lib/index.js';
	import { getContext, type Snippet } from 'svelte';
	import type { WizardStepProperties, WizardStepsStore } from './index.js';

	type T = $$Generic;
	type TKey = $$Generic;
	let {
		key,
		...others
	}: WizardStepProperties & {
		key: string | number;
	} = $props();

	const context = getContext<WizardStepsStore>('wizard');

	$effect(() => context.set(key, others));
</script>

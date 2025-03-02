<script lang="ts">
	import './style.css';
	import { Button } from '../button/index.js';
	import { Floating } from '../floating/index.js';
	import { Icon, icons } from '../icon/index.js';
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

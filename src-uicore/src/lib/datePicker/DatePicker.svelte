<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import './style.css';
	import { Input } from '../input/index.js';

	let {
		value = $bindable(''),
		label,
		icon,
		onchange
	}: HTMLInputAttributes & {
		label?: string;
		icon?: string;
	} = $props();

	function onInternalChange() {
		onchange && onchange(value);
	}
</script>

<Input {label} {icon} bind:value onchange={onInternalChange} />

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes, HTMLTextareaAttributes } from 'svelte/elements';
	import './input.css';
	import '../text/text.css';
	import Icon from '../icon/Icon.svelte';
	import { icons } from '../icon/index.js';
	import { Text } from '../text/index.js';
	import { Button } from '../button/index.js';

	type T = $$Generic;
	let {
		id = Math.random().toString(36).substring(7),
		value = $bindable([]),
		onchange,
		...others
	}: HTMLInputAttributes & {
		value: File[];
	} = $props();
</script>

<div class="file-input {others.class}">
	<input bind:value type="file" {id} {onchange} {...others} />
	<label for={id} class="text small">
		<Icon name={icons.controls.add} />
		<Text>Select file</Text>
	</label>
	<ul>
		{#each value as file, i (i)}
			<li>
				<Button label={file?.name} />
				<Button icon={icons.controls.add} label="Delete" hideLabel />
			</li>
		{/each}
	</ul>
</div>

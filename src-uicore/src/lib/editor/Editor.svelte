<script lang="ts">
	import './style.css';
	import { Button } from '../button/index.js';
	import { icons } from '../icon/index.js';

	let {
		value = $bindable(''),
		onchange,
		oninput
	}: {
		value: string;
		onchange?: (event: Event) => void;
		oninput?: (event: Event) => void;
	} = $props();

	function input(event: Event) {
		const target = event.target as HTMLInputElement | HTMLTextAreaElement;
		value = target.value;
		oninput?.(event);
	}

	function change(event: Event) {
		const target = event.target as HTMLInputElement | HTMLTextAreaElement;
		value = target.value;
		onchange?.(event);
	}
</script>

<div class="editor">
	<header>
		<Button icon={icons.controls.add} label="Bold" hideLabel />
		<Button icon={icons.controls.add} label="Italic" hideLabel />
		<Button icon={icons.controls.add} label="Underline" hideLabel />
	</header>
	<main>
		<textarea oninput={input} onchange={change}>{value}</textarea>
	</main>
</div>

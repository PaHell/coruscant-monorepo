<script lang="ts">
	import './style.css';
	import { Button } from '../button/index.js';
	import { icons } from '../icon/index.js';
	import { UserAvatar } from '../userAvatar/index.js';
	import { Input } from '../input/index.js';
	import type { Snippet } from 'svelte';

	let {
		chatName,
		chatAvatar,
		value = $bindable(''),
		onchange,
		oninput,
		onsend,
		buttons,
		messages
	}: {
		chatName: string;
		chatAvatar: string | null | undefined;
		value: string;
		onchange?: (event: Event) => void;
		oninput?: (event: Event) => void;
		onsend: (event: Event) => void;
		buttons?: Snippet<[]>;
		messages: Snippet<[]>;
	} = $props();
</script>

<div class="chat">
	<header>
		<UserAvatar size="small" label={chatName} src={chatAvatar} />
		{@render buttons?.()}
	</header>
	<main>
		{@render messages()}
	</main>
	<footer>
		<Input {oninput} {onchange} bind:value />
		<Button icon={icons.controls.add} label="Send" hideLabel onclick={onsend} />
	</footer>
</div>

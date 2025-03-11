<script lang="ts">
	import { Modal } from '$lib/index.js';
	import { Button } from '$lib/index.js';
	import type { FeedbackModel } from './index.js';
	import { Input } from '$lib/index.js';
	import { Rating } from '$lib/index.js';

	let {
		rating = $bindable(),
		message = $bindable(),
		email = $bindable(),
		visible = $bindable(),
		onsend
	}: FeedbackModel & {
		visible: boolean;
		onsend: (value: FeedbackModel) => void;
	} = $props();
</script>

<Modal bind:visible title="Please provide your feedback" class="feedback-dialog">
	{#snippet body()}
		<Rating bind:value={rating} />
		<Input bind:value={message} label="Message" isTextarea required />
		<Input bind:value={email} label="Email" />
	{/snippet}
	{#snippet footer()}
		<Button variant="secondary" label="Cancel" onclick={() => (visible = false)} />
		<Button
			variant="primary"
			label="Send"
			onclick={() =>
				onsend({
					rating,
					message,
					email
				})}
		/>
	{/snippet}
</Modal>

<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Modal, Text, Button } from '$lib/index.js';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Atoms/Modal',
		component: Modal,
		tags: ['autodocs'],
		argTypes: {},
		args: {}
	});

	let visible: boolean = $state(false);
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default">
	<Button value="Open Modal" class="my-48" onclick={() => (visible = true)} />
	<Modal title="Title" bind:visible>
		{#snippet body()}
			<Text>Body</Text>
		{/snippet}
		{#snippet footer()}
			<Text>Footer</Text>
			<Button variant="secondary" value="Close" onclick={() => (visible = false)} />
		{/snippet}
	</Modal>
</Story>

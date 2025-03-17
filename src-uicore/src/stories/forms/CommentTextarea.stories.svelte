<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { CommentTextarea } from '$lib/index.js';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Forms/CommentTextarea',
		component: CommentTextarea,
		tags: ['autodocs'],
		argTypes: {},
		args: {}
	});

	let value = $state('');
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default" args={{ userSrc: undefined, userLabel: 'Xavier Dnies', value }} />

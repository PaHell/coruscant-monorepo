<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from '$lib/button/Button.svelte';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Example/Button',
		component: Button,
		tags: ['autodocs'],
		argTypes: {},
		args: {}
	});
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default" args={{ variant: 'default', label: 'Button' }} />
<Story name="Primary" args={{ variant: 'primary', label: 'Button' }} />
<Story name="Transparent" args={{ variant: 'transparent', label: 'Button' }} />
<Story name="Outline" args={{ variant: 'outline', label: 'Button' }} />
<Story name="Subtle" args={{ variant: 'subtle', label: 'Button' }} />
<Story name="Warning" args={{ variant: 'warning', label: 'Button' }} />
<Story name="Danger" args={{ variant: 'danger', label: 'Button' }} />

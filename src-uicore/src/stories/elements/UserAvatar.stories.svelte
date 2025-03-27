<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { UserAvatar, Input, icons, Text, Button, Icon, Heading } from '$lib/index.js';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Elements/UserAvatar',
		component: UserAvatar,
		tags: ['autodocs'],
		argTypes: {},
		args: {}
	});

	const sizes: ('xs' | 'sm' | 'md' | 'lg')[] = ['xs', 'sm', 'md', 'lg'];
	const alphabet = 'abcdefghijklmnopqrstuvwxyz';
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story
	name="Default"
	args={{ src: 'https://xsgames.co/randomusers/avatar.php?g=female', label: 'UserAvatar' }}
/>
<Story name="Sizes">
	<div class="grid grid-cols-[auto_auto_1fr] gap-6 p-6 pb-0">
		{#each sizes as size}
			<UserAvatar
				src="https://xsgames.co/randomusers/avatar.php?g=female"
				label="User avatar small"
				{size}
				hideLabel
			/>
			<UserAvatar src={undefined} label="User avatar small" {size} hideLabel />
			<div></div>
		{/each}
	</div>
	<div class="grid grid-cols-[auto_auto_1fr] gap-6 p-6">
		{#each sizes as size}
			<UserAvatar
				src="https://xsgames.co/randomusers/avatar.php?g=female"
				label="User avatar small"
				{size}
			/>
			<UserAvatar src={undefined} label="User avatar small" {size} />
			<div></div>
		{/each}
	</div>
</Story>
<Story name="Slots">
	<div class="grid w-full grid-cols-[auto_1fr] gap-6 p-6">
		{#each sizes as size}
			<UserAvatar
				src="https://xsgames.co/randomusers/avatar.php?g=female"
				label="User avatar small"
				{size}
			>
				{#snippet header()}
					{#if size === 'xs'}
						<Text small>Lorem</Text>
					{:else}
						<Button variant="secondary" icon={icons.controls.edit} label="Edit" {size} />
					{/if}
				{/snippet}
			</UserAvatar>
			<div></div>
		{/each}
	</div>
	<div class="grid w-full grid-cols-[auto_1fr] gap-6 p-6">
		{#each sizes as size}
			<UserAvatar
				src="https://xsgames.co/randomusers/avatar.php?g=female"
				label="User avatar small"
				{size}
			>
				{#snippet header()}
					{#if size === 'xs'}
						<Text small>(Online)</Text>
					{:else}
						<Button variant="secondary" icon={icons.controls.edit} label="Edit" {size} />
					{/if}
				{/snippet}
				{#snippet subtitle()}
					{#if size === 'xs'}
						<Text small>(Online)</Text>
					{:else}
						<div class="flex items-center">
							<Icon {size} name={icons.controls.add} class="text-secondary" />
							{#if size === 'sm'}
								<Text small>Joined 2025</Text>
							{:else}
								<Heading level={size === 'md' ? 6 : 4}>Joined 2025</Heading>
							{/if}
						</div>
					{/if}
				{/snippet}
			</UserAvatar>
			<div></div>
		{/each}
	</div>
</Story>
<Story name="Colors">
	<div class="flex w-full flex-wrap space-y-6 space-x-6 p-6">
		{#each [...alphabet] as label0}
			{#each [...alphabet] as label1}
				{#each sizes as size}
					<UserAvatar src={undefined} label={label0 + ' ' + label1} {size} hideLabel />
				{/each}
			{/each}
		{/each}
	</div>
</Story>

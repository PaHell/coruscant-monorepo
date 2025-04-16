<script lang="ts">
	import { type Snippet } from 'svelte';
	import { Icon, icons, Button, Heading, UserAvatar, Input, Floating } from '$lib/index.js';
	import type { HTMLAttributes, HTMLBaseAttributes } from 'svelte/elements';
	import Text from '../text/Text.svelte';

	let {
		userSrc,
		userLabel,
		value = $bindable(),
		children,
		...others
	}: HTMLAttributes<HTMLDivElement> & {
		userSrc: string | null | undefined;
		userLabel: string;
		value: string;
		children: Snippet<[]>;
	} = $props();
</script>

<div {...others} class="comment-textarea {others.class}">
	<UserAvatar src={userSrc} label={userLabel} hideLabel />
	<div class="comment-textarea-content">
		<Input placeholder="Add a comment..." bind:value isTextarea />
		<div class="comment-textarea-controls">
			<div>
				<Button variant="integrated" icon={icons.controls.add} value="Upload" hideValue />
			</div>
			<div>
				<div class="button-group">
					<Button value="Post" />
					<Floating placement="bottom-end" hidden>
						{#snippet trigger({ toggle })}
							<Button
								variant="primary"
								icon={icons.controls.dropdown}
								value="More"
								hideValue
								class="-m-px !rounded-s-none"
								onclick={toggle}
							/>
						{/snippet}
						{#snippet menu()}
							<Text>More Options for Sending</Text>
						{/snippet}
					</Floating>
				</div>
			</div>
		</div>
	</div>
</div>

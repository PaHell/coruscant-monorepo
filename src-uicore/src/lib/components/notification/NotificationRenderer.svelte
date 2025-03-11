<script lang="ts">
	import { Button } from '$lib/index.js';
	import { Heading, Text } from '$lib/index.js';
	import { Icon, icons } from '$lib/index.js';
	import {
		createNotificationStore,
		NotificationContextKey,
		type Notification,
		type NotificationContext
	} from './index.js';
	import { onDestroy, setContext, type Snippet } from 'svelte';

	let {
		timeout,
		children
	}: {
		timeout: number;
		children: Snippet<[]>;
	} = $props();

	const store = createNotificationStore(timeout);

	setContext<NotificationContext>(NotificationContextKey, store);

	let notifications = $state<(Notification & { id: number })[]>([]);

	const unsubscriber = store.subscribe((value) => {
		notifications = value;
	});

	onDestroy(unsubscriber);

	function getTypeIcon() {
		return icons.controls.add;
	}
</script>

{@render children()}
<div class="notification-renderer">
	<div>
		{#each notifications as notification (notification.id)}
			<div class="notification notification-{notification.type}">
				<Icon name={notification.icon ?? getTypeIcon()} />
				<div>
					<Heading level={6}>{notification.title}</Heading>
					{#if notification.icon}
						<Text>{notification.message}</Text>
					{/if}
				</div>
				<Button
					variant="integrated"
					icon={icons.controls.close}
					label="Close"
					hideLabel
					onclick={() => store.remove(notification.id)}
				/>
			</div>
		{/each}
	</div>
</div>

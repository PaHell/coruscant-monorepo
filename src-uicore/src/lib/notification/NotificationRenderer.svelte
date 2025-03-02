<script lang="ts">
	import './style.css';
	import { Button } from '../button/index.js';
	import { Heading, Text } from '../text/index.js';
	import { Icon, icons } from '../icon/index.js';
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

	const { subscribe, ...methods } = createNotificationStore(timeout);

	setContext<NotificationContext>(NotificationContextKey, methods);

	let notifications = $state<(Notification & { id: number })[]>([]);

	const unsubscriber = subscribe((value) => {
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
					onclick={() => methods.remove(notification.id)}
				/>
			</div>
		{/each}
	</div>
</div>

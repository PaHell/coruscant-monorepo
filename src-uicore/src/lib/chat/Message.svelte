<script lang="ts">
	import { Button } from '../button/index.js';
	import { icons } from '../icon/index.js';
	import { Text } from '../text/index.js';
	import { MessagePayloadType } from './index.js';
	import { UserAvatar } from '../userAvatar/index.js';
	import { VideoPlayer } from '../videoPlayer/index.js';

	let {
		payload,
		timestamp,
		userName,
		userAvatar,
		variant,
		onedit
	}: {
		payload: string;
		timestamp: string;
		userName: string;
		userAvatar: string | null | undefined;
		variant: 'sent' | 'received' | 'thread';
		onedit?: (event: Event) => void;
	} = $props();

	let type = $derived(() => {
		if (payload.startsWith('http')) {
			if (payload.endsWith('.png') || payload.endsWith('.jpg') || payload.endsWith('.jpeg')) {
				return MessagePayloadType.Image;
			} else if (payload.endsWith('.mp3') || payload.endsWith('.wav') || payload.endsWith('.ogg')) {
				return MessagePayloadType.Audio;
			} else if (
				payload.endsWith('.mp4') ||
				payload.endsWith('.webm') ||
				payload.endsWith('.ogg')
			) {
				return MessagePayloadType.Video;
			}
		}
		if (payload.startsWith('data:')) return MessagePayloadType.Image;
		return MessagePayloadType.Text;
	});
</script>

<div class="message-row message-{variant}">
	<div class="message-container">
		<div class="message-bubble">
			{#if onedit}
				<Button icon={icons.controls.add} label="Edit" hideLabel />
			{/if}
			{#if type() === MessagePayloadType.Text}
				<Text>{payload}</Text>
			{:else if type() === MessagePayloadType.Image}
				<img src={payload} alt={payload} />
			{:else if type() === MessagePayloadType.Audio}
				<audio src={payload} controls>
					<track kind="captions" />
				</audio>
			{:else if type() === MessagePayloadType.Video}
				<VideoPlayer title={payload} src={payload} poster={payload} tracks={[]} />
			{:else}
				<p>Unsupported message type</p>
			{/if}
			<Text small>{timestamp}</Text>
		</div>
		<UserAvatar size="small" label={userName} src={userAvatar} />
	</div>
</div>

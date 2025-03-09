<script lang="ts">
	import { Text } from '../text/index.js';
	import { icons } from '../icon/index.js';
	import type { HTMLTrackAttributes, HTMLVideoAttributes } from 'svelte/elements';
	import { Button } from '../button/index.js';

	let {
		loaded = $bindable(false),
		title,
		poster,
		tracks = [],
		...others
	}: HTMLVideoAttributes & {
		loaded?: boolean;
		title: string;
		poster: string;
		tracks?: HTMLTrackAttributes[];
	} = $props();
</script>

<div class="video-player">
	{#if loaded}
		<div class="video-player-placeholder">
			<img src={poster} alt={title} />
			<Button icon={icons.controls.add} label="Play" hideLabel />
		</div>
	{:else}
		<video {...others}>
			{#each tracks as track}
				<track {...track} />
			{/each}
			<Text>Failed to load video</Text>
		</video>
	{/if}
</div>

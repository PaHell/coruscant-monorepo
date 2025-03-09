<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let { ...others }: HTMLAttributes<HTMLDivElement> & {} = $props();
</script>

<div class="loading-spinner {others.class}" {...others}></div>

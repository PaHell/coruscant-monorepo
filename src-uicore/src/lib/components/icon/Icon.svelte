<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	const {
		name,
		size = 'md',
		...others
	}: HTMLAttributes<HTMLElement> & {
		name: string;
		size?: 'sm' | 'md' | 'lg';
	} = $props();
</script>

<i {...others} class="icon icon-size-{size} ri-{name} {others.class}"></i>

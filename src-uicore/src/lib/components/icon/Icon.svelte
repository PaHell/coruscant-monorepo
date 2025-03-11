<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	const {
		name,
		...others
	}: HTMLAttributes<HTMLElement> & {
		name: string;
	} = $props();
</script>

<i class="icon ri-{name} {others.class}" {...others}></i>

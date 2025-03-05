<script lang="ts">
	import './style.css';
	import { getContext, onDestroy, setContext, type Snippet } from 'svelte';
	import {
		TableContextKey,
		type ColumnProperties,
		type RowContext,
		type TableContext
	} from './index.js';
	import type { readable, writable } from 'svelte/store';

	type TStore = $$Generic<writable>;
	type TValue = $$Generic<readable<TStore>>;
	let {
		store,
		children
	}: {
		store: TStore;
		children: Snippet<[TValue]>;
	} = $props();
</script>

{@render children($store)}

<script lang="ts">
	import './style.css';
	import { Button } from '../button/index.js';
	import { Text } from '../text/index.js';
	import { createFormStore, FormContextKey, type FormContext } from './index.js';
	import { setContext, type Snippet } from 'svelte';
	import { Alert } from '../alert/index.js';
	import type { HTMLFormAttributes } from 'svelte/elements';

	let {
		submit,
		cancel,
		onSubmit,
		onCancel,
		children,
		...others
	}: HTMLFormAttributes & {
		submit: string;
		cancel: string;
		onSubmit: (event: Event) => void;
		onCancel: (event: Event) => void;
		children: Snippet<[]>;
	} = $props();

	const store = createFormStore();

	setContext<FormContext>(FormContextKey, store);
</script>

<form class="form {others.class}" {...others}>
	<div class="form-errors">
		{#each Object.entries($store).filter(([, value]) => !value.valid) as [key, value] (key)}
			<Alert variant="danger">
				<Text>{key}: {value.error}</Text>
			</Alert>
		{/each}
	</div>
	<div class="form-content">
		{@render children()}
	</div>
	<div class="form-actions">
		<Button variant="secondary" type="reset" label={cancel} onclick={onCancel} />
		<Button variant="primary" type="submit" label={submit} onclick={onSubmit} />
	</div>
</form>

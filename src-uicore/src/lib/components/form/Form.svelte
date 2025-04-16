<script lang="ts">
	import { Button } from '$lib/index.js';
	import { Text } from '$lib/index.js';
	import { createFormStore, FormContextKey, type FormContext } from './index.js';
	import { setContext, type Snippet } from 'svelte';
	import { Alert } from '$lib/index.js';
	import type { HTMLFormAttributes } from 'svelte/elements';
	import { enhance } from '$app/forms';

	let {
		submit,
		cancel,
		onSubmit,
		onCancel,
		debug = false,
		children,
		...others
	}: HTMLFormAttributes & {
		submit: string;
		cancel: string;
		onSubmit: (event: Event) => void;
		onCancel: (event: Event) => void;
		debug?: boolean;
		children: Snippet<[]>;
	} = $props();

	let ref: HTMLFormElement | undefined = $state();
	let formObj: { [key: string]: unknown } = $state({});
	const store = createFormStore();

	setContext<FormContext>(FormContextKey, store);

	function handleSubmit(event: Event) {
		const form = event.target as HTMLFormElement;
		event.preventDefault();
		const formData = new FormData(form);
		formObj = {};
		for (const [fieldName] of formData) {
			const fieldValue = formData.getAll(fieldName);
			formObj[fieldName] = fieldValue.length == 1 ? fieldValue.toString() : fieldValue;
		}
		console.log(formData);
		onSubmit(event);
	}
</script>

<form bind:this={ref} class="form {others.class}" {...others} onsubmit={handleSubmit}>
	{#if debug}
		<div class="grid grid-cols-2">
			<pre class="text-xs">{JSON.stringify($store, null, 2)}</pre>
			<pre class="text-xs">{JSON.stringify(formObj, null, 2)}</pre>
		</div>
	{/if}
	{#if Object.values($store).find((v) => !!v.error)}
		<div class="form-errors">
			{#each Object.entries($store).filter(([, value]) => !value.valid) as [key, value] (key)}
				<Alert variant="danger">
					<Text>{key}: {value.error}</Text>
				</Alert>
			{/each}
		</div>
	{/if}
	<div class="form-content">
		{@render children()}
	</div>
	<div class="form-actions">
		<Button variant="secondary" type="reset" value={cancel} onclick={onCancel} />
		<Button variant="primary" type="submit" value={submit} />
	</div>
</form>

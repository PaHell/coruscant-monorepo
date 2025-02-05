<script lang="ts">
	import { Button } from '@pahell/coruscant-uicore';
	import { WeatherForecastClient, type WeatherForecast } from '@pahell/coruscant-client';
	import { onMount } from 'svelte';

	let data: WeatherForecast[] = [];
	onMount(async () => {
		const client = new WeatherForecastClient('https://localhost:32770');
		data = await client.get();
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

{#if data.length > 0}
	<ul>
		{#each data as item}
			<li>{item.date} - {item.temperatureC}C - {item.temperatureF}F</li>
		{/each}
	</ul>
{:else}
	<p>Loading...</p>
{/if}

<Button href="https://svelte.dev/docs/kit" label="Lorem" />

<script lang="ts">
	import Close from './close.svelte';
	import Move from './move.svelte';
	import { onMount } from 'svelte';

	let alert: HTMLDivElement;
	let buttonsContainer: HTMLDivElement;

	export let message: string;
	export let buttons: HTMLButtonElement[] | null = null;

	onMount(() => {
		buttons?.forEach((button: HTMLButtonElement) => {
			buttonsContainer.appendChild(button);
		});
	});

	function close() {
		alert.remove();
	}
</script>

<div class="px-4 py-2" id="alert" bind:this={alert}>
	<Close {close} />
	<div class="flex flex-col gap-4">
		<h1 class="text-xs text-red-600 text-center">
			{message}
		</h1>
		<div class="flex felx-row gap-2 text-sm jsutify-center m-auto" bind:this={buttonsContainer}></div>
	</div>
	<Move board={alert} />
</div>

<style>
	#alert {
		background: rgba(0, 0, 0, 0.95);
		border: white 2px solid;
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 150px;
		max-width: 300px;
	}
</style>

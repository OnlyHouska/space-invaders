<script lang="ts">
	import { playerName } from '$lib/stores';
	import { onMount } from 'svelte';

	let name: HTMLInputElement;
	let submitButton: HTMLButtonElement;

	function setName() {
		if (name) {
			playerName.set(name.value || null);
		}
	}

	onMount(() => {
		if (name) {
			name.addEventListener('input', (event): void => {
				const input = event.target as HTMLInputElement;
				input.value = input.value.replace(/[^a-zA-Z]/g, '');
				if (name.value.length == 4) submitButton.disabled = false;
				else submitButton.disabled = true;
			});
		}
	});
</script>

<div class="popup_window text-sm" id="changeNameWindow">
	<div class="flex flex-row gap-2 justify-center text-center items-center">
		<label for="playerNameInput" class="block">Player name:</label>
		<input
			placeholder="ABCD"
			class="bg-transparent border-2 rounded-sm w-20 uppercase"
			type="text"
			maxlength="4"
			id="playerNameInput"
			bind:this={name}
		/>
		<button
			disabled
			bind:this={submitButton}
			class="bg-white text-black w-5 h-5 rounded-sm text-center disabled:opacity-50 transition-all"
			on:click={setName}
		>
			&gt;
		</button>
	</div>
</div>

<style>
	#changeNameWindow {
		height: fit-content;
		padding-bottom: 30px;
	}

	button:hover {
		color: black;
	}
</style>

<script lang="ts">
	import Move from './components/move.svelte';
	import Close from './components/close.svelte';
	import Alert from './components/alert.svelte';

	export let close: () => void;

	let board: HTMLDivElement;

	let highscores: () => string[] = (): string[] => {
		return document.cookie.split(';');
	};

	let yesButton: HTMLButtonElement = document.createElement('button');
	let noButton: HTMLButtonElement = document.createElement('button');
	yesButton.textContent = 'Yes';
	noButton.textContent = 'No';
	yesButton.classList.add('hover:text-green-500');
	noButton.classList.add('hover:text-red-500');
	yesButton.onclick = resetHighscores;
	noButton.onclick = () => {
		document.getElementById('alert')?.remove();
	};

	function showAlert(): void {
		let _alert = new Alert({
			target: document.body,
			props: {
				message: 'Are you sure you want to reset highscores?',
				buttons: [yesButton, noButton]
			}
		});
	}

	function resetHighscores(): void {
		var Cookies = document.cookie.split(';');
		for (var i = 0; i < Cookies.length; i++)
			document.cookie = Cookies[i] + '=;expires=' + new Date(0).toUTCString();

		location.reload();
	}
</script>

<div bind:this={board} class="popup_window overflow-y-scroll" id="highscores">
	<Close {close} />
	<h2 class="mb-8">Highscores</h2>
	<div class="text-xs flex flex-col gap-3 uppercase">
		{#each highscores() as score}
			<p>{score.replace('=', ': ')}</p>
		{/each}
	</div>
	<button on:click={showAlert} class="absolute left-0 bottom-0 text-xs ml-2 mb-2">Reset</button>
	<Move {board} />
</div>

<style>
	.popup_window {
		left: 62.3%;
		top: 10%;
	}
</style>

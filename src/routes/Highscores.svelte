<script lang="ts">
	import Move from './components/move.svelte';
	import Close from './components/close.svelte';

	export let close: () => void;

	let board: HTMLDivElement;

	let highscores: () => string[] = (): string[] => {
		return document.cookie.split(';');
	};
</script>

<div bind:this={board} class="popup_window overflow-y-scroll" id="highscores">
	<Close {close} />
	<h2 class="mb-8">Highscores</h2>
	<div class="text-xs flex flex-col gap-3 uppercase">
		{#each highscores() as score}
			<p>{score.replace('=', ': ')}</p>
		{/each}
	</div>
	<Move {board} />
</div>

<style>
	.popup_window {
		left: 62.3%;
		top: 10%;
	}
</style>

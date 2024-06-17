<script lang="ts">
	import { setCookie } from '$lib/cookies';
	import { Controls } from '$lib/global';
	import { playerName } from '$lib/stores';

	let board: HTMLElement;
	export let gameOver: boolean;
	export let score: number = 0;
	Controls.lock();

	function restart() {
		location.reload();
	}

	setCookie($playerName ?? '', score.toString().padStart(4, '0'));
</script>

<div class="h-full z-50" bind:this={board}>
	{#if gameOver}
		<div id="game-over" class="flex w-full h-full justify-center flex-col gap-2 text-center">
			<h1 class="text-3xl self-center text-red-600">GAME OVER</h1>
			<p>SCORE: {score}</p>
			<button title="Restart" on:click={restart}>Restart</button>
		</div>
	{:else}
		<div id="win" class="flex w-full h-full justify-center flex-col gap-2">
			<h1 class="text-center text-3xl self-center text-green-600">YOU WIN!</h1>
			<p>SCORE: {score.toString().padStart(4, '0')}</p>
			<button title="Restart" on:click={restart}>Restart</button>
		</div>
	{/if}
</div>

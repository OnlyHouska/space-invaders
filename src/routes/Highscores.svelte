<script lang="ts">
	import Move from './components/move.svelte';
	import Close from './components/close.svelte';

	export let close: () => void;

	let board: HTMLDivElement;
</script>

<div bind:this={board} class="popup_window">
	<Close {close} />
	<h2 class="mb-8">Highscores</h2>
	<div class="text-xs">
		<p>ABCD: <span>300</span></p>
		<p>JQKB: <span>420</span></p>
		<p>IWNS: <span>120</span></p>
		<p>PAKN: <span>310</span></p>
	</div>
	<Move {board} />
</div>

<style></style>

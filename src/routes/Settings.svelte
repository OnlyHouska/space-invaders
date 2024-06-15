<script lang="ts">
	import Move from './components/move.svelte';
	import Close from './components/close.svelte';

	export let close: () => void;

	let board: HTMLDivElement;
</script>

<div bind:this={board} class="popup__window">
	<Close {close} />

	<h2 class="mb-8">Settings</h2>
	<div class="text-xs"></div>
	<Move {board} />
</div>

<style></style>

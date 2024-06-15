<script lang="ts">
	import Close from './close.svelte';
	import Move from './move.svelte';

	let alert: HTMLDivElement;

	function close() {
		alert.remove();
	}
</script>

<div class="px-4 py-2" id="alert" bind:this={alert}>
	<Close {close} />
	<div>
		<h1 class="text-xs text-red-600 text-center">
			I'm sorry, you can't play this game on this screen size
		</h1>
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

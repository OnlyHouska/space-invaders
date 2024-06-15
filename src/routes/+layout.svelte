<script>
	import '../app.css';
</script>

<div>
	<main>
		<slot />
	</main>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

	:global(body) {
		background: black;
		font-family: 'Press Start 2P', monospace;
		user-select: none;
		color: white;
		padding: 50px;
	}
</style>

<script lang="ts">
	import src from '$lib/assets/layout.png';

	function setLayout(): void {
		let settings: HTMLElement | null = document.getElementById('settings');
		let gameWindow: HTMLElement | null = document.getElementById('gameWindow');
		let updateNotes: HTMLElement | null = document.getElementById('updateNotes');
		let highscores: HTMLElement | null = document.getElementById('highscores');

		if (settings) {
			settings.style.top = '10%';
			settings.style.left = '80%';
		}
		if (updateNotes) {
			updateNotes.style.top = '50%';
			updateNotes.style.left = '52.3%';
		}
		if (gameWindow) {
			gameWindow.style.top = '25%';
			gameWindow.style.left = '5%';
		}
		if (highscores) {
			highscores.style.top = '10%';
			highscores.style.left = '62.3%';
		}
	}
</script>

<button
	on:click={setLayout}
	class="absolute top-0 right-0 mt-2 mr-2 opacity-50 transition-all hover:opacity-100 hidden lg:block"
	title="Snap to the layout"
>
	<img {src} alt="layout" />
</button>

<style></style>

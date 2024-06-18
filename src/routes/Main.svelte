<script lang="ts">
	import inv from '$lib/assets/crab.png';
	import lock from '$lib/assets/lock.svg';
	import Popup from './Window.svelte';
	import { Type } from '$lib/global';
	import Alert from './components/alert.svelte';
	import { playerName } from '$lib/stores';

	let showHighscores: boolean = false;
	let showSettings: boolean = false;
	let showGame: boolean = false;
	let highscoresButton: HTMLButtonElement;
	let settingsButton: HTMLButtonElement;
	let playButton: HTMLButtonElement;

	function toggleHighscoresPopup(): void {
		showHighscores = !showHighscores;
		highscoresButton.blur();
	}
	function toggleSettingsPopup(): void {
		showSettings = !showSettings;
		settingsButton.blur();
	}
	function toggleGamePopup(): void {
		if (window.innerWidth < 768)
			new Alert({
				target: document.body,
				props: { message: "I'm sorry, you can't play this game on this screen size (yet)" }
			});
		else {
			$playerName = null;
			showGame = !showGame;
			playButton.blur();
		}
	}
</script>

<header class="flex justify-center flex-col gap-20">
	<div class="justify-center flex flex-col gap-8 self-center">
		<img class="w-20 self-center" src={inv} alt="logo" />
		<h1 class="text-4xl text-center">Space Invaders</h1>
	</div>
	<div class="self-center text-lg flex flex-col gap-4 text-center">
		<button bind:this={playButton} on:click={toggleGamePopup} class="w-fit m-auto">Play</button>
		<button bind:this={settingsButton} on:click={toggleSettingsPopup} class="w-fit m-auto"
			>Settings</button
		>
		<button bind:this={highscoresButton} on:click={toggleHighscoresPopup} class="w-fit"
			>Highscores</button
		>
		<button
			on:click={() => {
				alert('redirect to portofilo');
			}}
			class="w-fit m-auto">Exit</button
		>
	</div>
	{#if showHighscores}
		<Popup popupType={Type.highscores} close={toggleHighscoresPopup} />
	{/if}
	{#if showSettings}
		<Popup popupType={Type.settings} close={toggleSettingsPopup} />
	{/if}
	{#if showGame}
		<Popup popupType={Type.game} close={toggleGamePopup} />
	{/if}
</header>

<script script lang="ts">
	import { Type } from '$lib/global';
	import Highscores from './Highscores.svelte';
	import Settings from './Settings.svelte';
	import Game from './Game.svelte';
	import UpdateNotes from './components/update_notes.svelte';
	export let popupType: Type;
	export let close: () => void;
	let popupWindow: HTMLDivElement;
</script>

<div bind:this={popupWindow} id="popupWindow">
	{#if popupType == Type.highscores}
		<Highscores {close} />
	{:else if popupType == Type.settings}
		<Settings {close} />
	{:else if popupType == Type.game}
		<Game {close} />
	{:else if popupType == Type.updateNotes}
		<UpdateNotes {close} />
	{/if}
</div>

<style></style>

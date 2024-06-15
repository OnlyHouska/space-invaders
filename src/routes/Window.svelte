<script script lang="ts">
	import { Type } from '$lib/global';
	import Highscores from './Highscores.svelte';
	import Settings from './Settings.svelte';
	import Game from './Game.svelte';
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
	{/if}
</div>

<style></style>

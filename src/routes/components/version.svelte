<script lang="ts">
	import note from '$lib/assets/note.svg';
	import Window from '../Window.svelte';

	import { Type, version } from '$lib/global';

	let board: HTMLElement;
	let notesButton: HTMLButtonElement;

	let showUpdateNotes: boolean = false;
	function toggleUpdateNotes() {
		showUpdateNotes = !showUpdateNotes;
		notesButton.blur();
	}
</script>

<div
	class="absolute bottom-0 right-0 mr-2 mb-2 flex flex-row gap-2 justify-center items-center"
	bind:this={board}
>
	<button bind:this={notesButton} on:click={toggleUpdateNotes}>
		<img src={note} alt="update notes" class="w-7 h-7 opacity-30 hover:opacity-60 transition-all" />
	</button>
	<p class="text-xs text-white/30">{version}</p>
</div>
{#if showUpdateNotes}
	<Window popupType={Type.updateNotes} close={toggleUpdateNotes} />
{/if}

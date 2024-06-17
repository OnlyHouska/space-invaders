<script lang="ts">
	import Close from './close.svelte';
	import Move from './move.svelte';
	import { version } from '$lib/global';
	import updateNotes from '$lib/update_notes.json';

	export let close: () => void;
	let board: HTMLDivElement;

	let strippedVersion = version.replace('v. ', '');

	interface UpdateNotes {
		[key: string]: string[];
	}

	const typedUpdateNotes: UpdateNotes = updateNotes;
	const reversedVersions = Object.keys(typedUpdateNotes).reverse();
</script>

<div bind:this={board} class="popup_window overflow-y-auto" id="updateNotes">
	<Close {close} />
	<h1>Update notes</h1>
	<div class="flex flex-col mt-3 gap-3">
		{#each reversedVersions as ver}
			<div class="flex flex-col gap-2">
				<h2 class="version">
					Update {ver}
					{#if ver == strippedVersion}(Latest){/if}:
				</h2>
				<div>
					{#each typedUpdateNotes[ver] as note}
						<p>{note}</p>
					{/each}
				</div>
			</div>
		{/each}
	</div>
	<Move {board} />
</div>

<style>
	.popup_window {
		left: 52.3%;
		top: 50%;
	}
	.version {
		color: rgba(255, 255, 255, 0.6);
		text-decoration: underline;
	}
	.version ~ div,
	.version {
		font-size: x-small;
	}
</style>

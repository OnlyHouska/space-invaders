<script lang="ts">
	import Close from './close.svelte';
	import Move from './move.svelte';
	import { version } from '$lib/global';
	import updateNotes from '$lib/update_notes.json';
	import { onMount } from 'svelte';

	let selectVersion: HTMLSelectElement;
	let selectedVersion: string;

	export let close: () => void;
	let board: HTMLDivElement;

	let strippedVersion = version.replace('v. ', '');

	interface UpdateNotes {
		[key: string]: string[];
	}

	const typedUpdateNotes: UpdateNotes = updateNotes;
	const reversedVersions = Object.keys(typedUpdateNotes).reverse();

	onMount(() => {
		selectedVersion = reversedVersions[0];
	});

	$: if (!typedUpdateNotes[selectedVersion]) {
		selectedVersion = reversedVersions[0];
	}
</script>

<div bind:this={board} class="relative popup_window overflow-y-auto flex flex-col" id="updateNotes">
	<Close {close} />
	<div class="flex flex-row justify-between">
		<h1 class="text-lg">Update notes</h1>
		<div class="flex flex-col mt-3 gap-3">
			<select
				class="bg-transparent text-xs w-fit ml-auto"
				bind:this={selectVersion}
				bind:value={selectedVersion}
			>
				{#each reversedVersions as ver}
					<option class="version bg-black" value={ver}>
						{ver}
						{#if ver === strippedVersion}(Latest){/if}
					</option>
				{/each}
			</select>
		</div>
	</div>
	<div class="flex flex-col gap-2 mt-5">
		{#if typedUpdateNotes[selectedVersion]}
			{#each typedUpdateNotes[selectedVersion] as note}
				<p>{note}</p>
			{/each}
		{:else}
			<p>No update notes available for this version.</p>
		{/if}
	</div>
	<Move {board} />
</div>

<style>
	.popup_window {
		left: 52.3%;
		top: 50%;
		width: 700px;
		font-size: 0.7rem;
	}
	.version {
		color: rgba(255, 255, 255, 0.6);
		text-decoration: underline;
	}
	.version {
		font-size: x-small;
	}
</style>

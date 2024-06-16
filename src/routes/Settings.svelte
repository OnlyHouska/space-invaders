<script lang="ts">
	import Move from './components/move.svelte';
	import Close from './components/close.svelte';
	import { onMount } from 'svelte';

	export let close: () => void;

	let rightKey: HTMLElement;
	let leftKey: HTMLElement;
	let shootKey: HTMLElement;

	onMount((): void => {
		document.addEventListener('keydown', (e: KeyboardEvent): void => {
			if (e.key == 'd') {
				pulse(rightKey);
			}
			if (e.key == 'a') {
				pulse(leftKey);
			}
			if (e.key == ' ') {
				pulse(shootKey);
			}
		});
	});

	function pulse(key: HTMLElement) {
		if (!key) return;

		const buttonPulse: KeyframeEffect = new KeyframeEffect(
			key,
			[{ color: 'red' }, { borderColor: 'red' }],
			{ duration: 500 }
		);

		const buttonAnimation: Animation = new Animation(buttonPulse, document.timeline);

		buttonAnimation.play();
	}

	let board: HTMLDivElement;
</script>

<div bind:this={board} class="popup__window">
	<Close {close} />

	<h2 class="mb-8">Settings</h2>
	<div class="text-xs">
		<div class="flex justify-center flex-col">
			<div class="mt-3 w-full m-auto flex justify-center gap-3">
				<button
					on:click={() => {
						pulse(leftKey);
					}}
					id="keyboard_button"
					bind:this={leftKey}
				>
					A
				</button>
				<button
					on:click={() => {
						pulse(rightKey);
					}}
					id="keyboard_button"
					bind:this={rightKey}
				>
					D
				</button>
			</div>
		</div>
		<button
			on:click={() => {
				pulse(shootKey);
			}}
			id="shoot_button"
			class="mt-3"
			bind:this={shootKey}
		>
			-
		</button>
	</div>
	<Move {board} />
</div>

<style>
	#keyboard_button,
	#shoot_button {
		border: white 2px solid;
		width: 28px;
		height: 28px;
	}

	#shoot_button {
		width: 100%;
	}
</style>

<script lang="ts">
	import Move from './components/move.svelte';
	import Close from './components/close.svelte';
	import { onMount } from 'svelte';
	import { defaultColumns, defaultRows, setCols, setRows } from '$lib/global';

	export let close: () => void;

	let rightKey: HTMLElement;
	let leftKey: HTMLElement;
	let shootKey: HTMLElement;
	let invRows: HTMLInputElement;
	let invCols: HTMLInputElement;

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

		document.addEventListener('change', (e) => {
			let elm: HTMLInputElement = e.target as HTMLInputElement;

			if (elm == invRows) {
				setRows(parseInt(elm.value));
			} else if (e.target == invCols) {
				setCols(parseInt(elm.value));
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

<div bind:this={board} class="popup_window">
	<Close {close} />

	<h2 class="mb-8">Settings</h2>
	<div class="flex flex-col gap-5">
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

		<div class="flex flex-col gap-5">
			<h2 class="text-sm text-center">Invaders</h2>
			<div class="flex flex-col gap-2">
				<div class="text-xs flex flex-row justify-between items-center">
					<label for="invaderRows">Rows</label>
					<input
						placeholder={defaultRows.toString()}
						bind:this={invRows}
						type="text"
						name="invaderRows"
						id="invaderRows"
						class="w-6 h-6 text-center bg-transparent border-2 border-white"
					/>
				</div>
				<div class="text-xs flex flex-row justify-between items-center">
					<label for="invaderCols">Columns</label>
					<input
						placeholder={defaultColumns.toString()}
						bind:this={invCols}
						type="number"
						name="invaderCols"
						id="invaderCols"
						class="w-6 h-6 text-center bg-transparent border-2 border-white"
					/>
				</div>
			</div>
		</div>
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

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input[type='number'] {
		appearance: unset;
		-moz-appearance: textfield;
	}
</style>

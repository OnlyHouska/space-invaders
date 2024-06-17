<script lang="ts">
	import { onMount } from 'svelte';

	export let board: HTMLElement;
	let moveButton: HTMLDivElement;
	let offsetX: number;
	let offsetY: number;
	let isDragging = false;

	onMount(() => {
		main();
	});

	function main() {
		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
		moveButton.addEventListener('mousedown', onMouseDown);
	}

	function onMouseDown(e: MouseEvent) {
		if (!board) return;
		isDragging = true;
		const rect = board.getBoundingClientRect();
		offsetX = e.clientX - rect.left;
		offsetY = e.clientY - rect.top;
	}

	function onMouseMove(e: MouseEvent) {
		if (!board) return;
		if (isDragging) {
			board.style.left = e.clientX - offsetX + 'px';
			board.style.top = e.clientY - offsetY + 'px';
		}
	}

	function onMouseUp() {
		isDragging = false;
	}
</script>

<div class="absolute bottom-0 right-0 mr-2 mb-2 flex flex-row justify-center items-center">
	<p class="text-xs mr-2 text-white/90">move&gt;</p>
	<div class="cursor-move h-3 w-3 bg-white" bind:this={moveButton}></div>
</div>

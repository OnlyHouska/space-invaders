<script lang="ts">
	import src from '$lib/assets/crab.png';
	import { onMount } from 'svelte';
	export let id: number;
	let self: HTMLDivElement;

	let position = (): number => {
		return 0 + id * 35;
	};
	onMount(() => {
		self.style.left = position() + 'px';
	});
</script>

<div bind:this={self} id={`${id}`} class="invader w-7 absolute">
	<img {src} alt="crab" />
</div>

<style></style>

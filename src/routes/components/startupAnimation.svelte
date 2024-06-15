<script lang="ts">
	import atariLogo from '$lib/assets/atari_logo.png';
	import { Controls } from '$lib/global';
	import { onMount } from 'svelte';
	Controls.lock();
	let glitch: number = 10;

	onMount(() => {
		setTimeout(
			() => {
				let animation: HTMLElement | null = document.getElementById('startup-animation__container');
				if (!animation) return;
				animation.style.display = 'none';
				Controls.unlock();
			},
			2000 + Math.random() * 500 * 10
		);
	});
</script>

<div
	id="startup-animation__container"
	class="h-full w-full flex flex-col justify-center items-center bg-black z-40 absolute left-0 top-0"
>
	<div id="startup__keys" class="bg-black w-full z-20 absolute top-0"></div>
	<img class="z-10" src={atariLogo} alt="atari" />
	<div id="startup__title">
		<h1 class="text-8xl mt-6 z-20">ATARI</h1>
		<div class="flex -mt-[86px] absolute flex-col w-full left-0 z-0 gap-1">
			{#each Array.from({ length: glitch }, (_, i) => i) as x}
				<div>
					<div class="color-1 w-full h-[1px] bg-green-500 left-0"></div>
					<div class="color-1 w-full h-[1px] bg-purple-500 left-0"></div>
					<div class="color-1 w-full h-[1px] bg-cyan-500 left-0"></div>
				</div>
			{/each}
			<div class="color-1 w-full h-[1px] bg-green-500 left-0"></div>
		</div>
	</div>
	<div id="startup__keys" class="bg-black w-full z-20 absolute bottom-0"></div>
</div>

<style>
	@keyframes startup {
		from {
			height: 50%;
		}
		to {
			height: 0%;
			display: none;
		}
	}
	@keyframes changeHue {
		0% {
			filter: hue-rotate(0deg);
		}
		100% {
			filter: hue-rotate(360deg);
		}
	}
	#startup__keys {
		animation: 0.8s linear startup forwards;
	}
	#startup__title h1 {
		font-family: Arial, Helvetica, sans-serif;
		letter-spacing: 4px;
	}
	#startup__title div {
		animation: changeHue 2s linear infinite;
	}
</style>

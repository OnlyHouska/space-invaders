<script lang="ts">
	import { onMount } from 'svelte';
	import Move from './components/move.svelte';
	import Close from './components/close.svelte';
	import { Projectile } from '$lib/projectile';
	import Invader from './components/invader.svelte';
	import playerImage from '$lib/assets/rocket.png';
	import { Elements, gameHeight, isThereProjectile, playerWidth } from '$lib/global';
	import { isProjectile } from '$lib/stores';
	import StartupAnimation from './components/startupAnimation.svelte';
	import { lockedControls, Controls, invadersColumns, invadersRows } from '$lib/global';
	import Endscreen from './Endscreen.svelte';

	let board: HTMLDivElement;
	let player: HTMLDivElement;
	let playerContainer: HTMLDivElement;
	let enemies: HTMLDivElement;

	let gamePaused: boolean = true;
	let score: number = 0;
	let totalInvaders: number = invadersColumns * invadersRows;
	let currentInvaders: number = totalInvaders;
	let checkCollisions: any;
	let enemiesMoveTimeout: any = () => {
		if (gamePaused) return;
		setTimeout(moveEnemies, 1000 - (totalInvaders - currentInvaders) * 15);
	};
	let moveDown: boolean = false;
	let enemiesDirection: number = 1;
	let invaderStep: number = 15;
	let enemiesBorder: number = 15;

	export let close: () => void;

	export function startGame(): void {
		gamePaused = false;
		enemiesMoveTimeout();
	}

	onMount(() => {
		main();
	});

	$: if (isProjectile) {
		startCollisionCheck();
	} else {
		stopCollisionCheck();
	}

	function main(): void {
		document.addEventListener('keydown', movePlayer);

		if (!enemies.style.left) {
			enemies.style.left = invaderStep + 'px';
		}

		setInterval(() => {
			let invaders: NodeListOf<HTMLElement> | null = document.querySelectorAll('.invader');
			if (gamePaused) return;
			invaders.forEach((invader: HTMLElement) => {
				if (Math.random() < 0.01 + (totalInvaders - currentInvaders) / 500) {
					let xPos: number = parseFloat(invader.style.left);
					let yPos: number = invader.offsetTop;
					invaderShoot(xPos + invader.offsetWidth / 2 - 2);
				}
			});
		}, 1000);
	}

	function getProjectilePosition(): number {
		return parseFloat(player.style.left) + playerWidth / 1.25 || 0;
	}

	function movePlayer(e: KeyboardEvent): void {
		if (lockedControls) return;
		if (!player) return;
		let playerPos = parseFloat(player.style.left) || 0;
		if (e.key === 'd') {
			if (playerPos < 435) player.style.left = `${playerPos + 5}px`;
			if (gamePaused) {
				startGame();
			}
		}
		if (e.key === 'a') {
			if (playerPos > 0) player.style.left = `${playerPos - 5}px`;
			if (gamePaused) {
				startGame();
			}
		}
		if (e.key === ' ') {
			let shotByPlayer: boolean = true;
			let position: number = getProjectilePosition();
			if (gamePaused) {
				startGame();
			}

			if (!isThereProjectile()) new Projectile(position, shotByPlayer);
		}
	}

	function moveEnemies() {
		let checkForRightWall = (): boolean | null => {
			if (!enemies) return null;
			if (
				enemies.offsetLeft + (totalInvaders - 1) * invaderStep - (512 - enemiesBorder) / 2 >=
				512 - enemiesBorder
			)
				return true;
			return false;
		};
		if (currentInvaders <= 0) {
			gamePaused = true;
			new Endscreen({ target: board, props: { gameOver: false, score: score } });
		}

		if (!enemies) return;
		let xPos: number = parseFloat(enemies.style.left) || enemiesBorder;
		let yPos: number = parseFloat(enemies.style.top) || 45;

		if (moveDown) {
			enemies.style.top = yPos + 15 + 'px';
			moveDown = false;
			enemiesMoveTimeout();
			return;
		}

		enemies.style.left = xPos + enemiesDirection * invaderStep + 'px';
		if (checkForRightWall()) {
			enemiesDirection = -1;
			moveDown = true;
			enemiesMoveTimeout();
			return;
		} else if (enemies.offsetLeft <= enemiesBorder) {
			enemiesDirection = 1;
			moveDown = true;
			enemiesMoveTimeout();
			return;
		}
		moveDown = false;
		if (enemies.offsetTop + enemies.offsetHeight >= gameHeight()) {
			gamePaused = true;
			Controls.lock();
			new Endscreen({ target: board, props: { gameOver: true, score: score } });
		}
		enemiesMoveTimeout();
	}
	enemiesMoveTimeout();

	function checkForClearedColumn(): void {
		return;
	}

	function startCollisionCheck() {
		checkCollisions = setInterval(() => {
			const [collided, projectile] = checkForCollisions();
			if (collided) {
				if (collided == player) {
					projectile?.remove();
					gamePaused = true;
					new Endscreen({ target: board, props: { gameOver: true, score: score } });
					return;
				}
				if (projectile) projectile.remove();
				score += 10;
				collided.remove();
				currentInvaders -= 1;
				checkForClearedColumn();
			}
		}, 1);
	}

	function stopCollisionCheck() {
		if (checkCollisions) {
			clearInterval(checkCollisions);
			checkCollisions = null;
		}
	}

	function checkForCollisions(): [HTMLElement | null, HTMLElement | null] {
		let invaders: NodeListOf<HTMLElement> = document.querySelectorAll('.invader');
		let playerProjectile: HTMLElement | null = document.getElementById('player-projectile');
		let projectile: HTMLElement | null = document.getElementById('projectile');
		if (projectile) {
			if (Elements.collide(projectile, player)) {
				return [player, projectile];
			}
		}
		for (let i = 0; i < invaders.length; i++) {
			const invader = invaders[i];
			if (Elements.collide(invader, playerProjectile)) {
				return [invader, playerProjectile];
			}
		}

		return [null, null];
	}

	function invaderShoot(xPos: number) {
		if (!enemies) return;
		let shotByPlayer: boolean = false;
		new Projectile(xPos, shotByPlayer);
	}
</script>

<div class="popup_window game_window" bind:this={board} id="gameWindow">
	<StartupAnimation />
	<header class="justify-between flex flex-row">
		<h1>SCORE: {score.toString().padStart(4, '0')}</h1>
		<Close {close} />
	</header>
	<div id="enemies" bind:this={enemies} class="flex flex-col top-10 gap-5 w-fit absolute">
		{#each Array.from({ length: invadersRows }, (_, i) => i) as _y}
			<div class="flex flex-row mt-4">
				{#each Array.from({ length: invadersColumns }, (_, i) => i) as x}
					<Invader id={x} />
				{/each}
			</div>
		{/each}
	</div>
	<div bind:this={playerContainer}>
		<div bind:this={player} class="absolute bottom-0 mb-6 left-0 mx-4 z-10">
			<img style="width: {playerWidth}px;" src={playerImage} alt="player" />
		</div>
	</div>
	<Move {board} />
</div>

<style>
</style>

import { gameHeight } from './global';

export class Projectile {
	xPos: number;
	shotByPlayer: boolean;
	projectile: HTMLDivElement | null = null;
	moveInterval: any;
	enemies: HTMLElement | null = document.getElementById('enemies');
	gameBoard: HTMLElement | null = document.querySelector('.game_window');

	constructor(xPos: number, shotByPlayer: boolean) {
		this.xPos = xPos;
		this.shotByPlayer = shotByPlayer;
		this.createProjectile();
	}

	createProjectile() {
		this.projectile = document.createElement('div');
		this.projectile.setAttribute('about', this.shotByPlayer.toString());
		this.projectile.setAttribute('id', this.shotByPlayer ? 'player-projectile' : 'projectile');
		this.projectile.className = 'z-0 h-7 w-1 bg-white absolute';
		this.projectile.style.left = this.xPos + 'px';
		console.log(this.projectile);

		if (this.enemies && this.gameBoard && this.projectile) {
			if (this.shotByPlayer) {
				this.projectile.style.bottom = `48px`;
			} else {
				this.projectile.style.top = `${this.enemies.offsetHeight + this.enemies.offsetTop}px`;
			}
			this.gameBoard.appendChild(this.projectile);
		}

		this.startMoving();
	}

	startMoving() {
		let interval = this.shotByPlayer ? 10 : 20;

		this.moveInterval = setInterval(() => {
			if (!this.projectile) return;

			if (this.shotByPlayer) {
				let bottom = parseFloat(this.projectile.style.bottom || '0');
				this.projectile.style.bottom = bottom + 5 + 'px';
				if (bottom >= gameHeight()) {
					this.stopMoving();
					this.removeProjectile();
				}
			} else {
				if (!this.gameBoard) return;
				let top = parseFloat(this.projectile.style.top || '0');
				this.projectile.style.top = top + 5 + 'px';
				if (top >= gameHeight() + 10) {
					this.stopMoving();
					this.removeProjectile();
				}
			}
		}, interval);
	}

	stopMoving() {
		if (this.moveInterval) {
			clearInterval(this.moveInterval);
			this.moveInterval = null;
		}
	}

	removeProjectile() {
		if (this.projectile) {
			this.projectile.remove();
			this.projectile = null;
		}
	}
}

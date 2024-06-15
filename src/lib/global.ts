export enum Type {
	'highscores',
	'settings',
	'game'
}

export const playerWidth: number = 40;
export let lockedControls: boolean = false;
export let Controls = {
	lock: function (): void {
		lockedControls = true;
	},
	unlock: function (): void {
		lockedControls = false;
	}
};
export let isThereProjectile = (): boolean => {
	if (document.getElementById('player-projectile')) {
		return true;
	} else return false;
};

export function gameHeight(): number {
	if (window.innerWidth > 764) return 380;
	else return 0;
}

//FUNCTION Detect a collision of elements
export let Elements = {
	//from https://gist.github.com/yckart/7177551
	collide: function (el1: HTMLElement, el2: any) {
		let rect1 = el1.getBoundingClientRect();
		let rect2 = el2.getBoundingClientRect();

		return !(
			rect1.top > rect2.bottom ||
			rect1.right < rect2.left ||
			rect1.bottom < rect2.top ||
			rect1.left > rect2.right
		);
	},

	inside: function (el1: HTMLDivElement, el2: HTMLDivElement) {
		let rect1 = el1.getBoundingClientRect();
		let rect2 = el2.getBoundingClientRect();

		return (
			rect2.top <= rect1.top &&
			rect1.top <= rect2.bottom &&
			rect2.top <= rect1.bottom &&
			rect1.bottom <= rect2.bottom &&
			rect2.left <= rect1.left &&
			rect1.left <= rect2.right &&
			rect2.left <= rect1.right &&
			rect1.right <= rect2.right
		);
	}
};

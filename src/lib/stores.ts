import { writable, type Writable } from 'svelte/store';
import { isThereProjectile } from './global';

export const isProjectile: Writable<() => void> = writable(() => {
	isThereProjectile();
});

export const playerName: Writable<string | null> = writable(null);

import { writable } from 'svelte/store';
import { isThereProjectile } from './global';

export const isProjectile: any = writable(() => {
	isThereProjectile();
});

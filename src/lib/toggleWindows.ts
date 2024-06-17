import { showHighscores, showSettings, showGame, showUpdateNotes } from '$lib/stores';

export function toggleUpdateNotes(button: HTMLElement | null = null, close: boolean = false) {
	if (close) {
		showUpdateNotes.set(false);
		return;
	}
	showUpdateNotes.update((value) => !value);
	if (button) button.blur();
}

export function toggleHighscoresPopup(
	button: HTMLElement | null = null,
	close: boolean = false
): void {
	if (close) {
		showHighscores.set(false);
		return;
	}
	showHighscores.update((value) => !value);
	if (button) button.blur();
}

export function toggleSettingsPopup(
	button: HTMLElement | null = null,
	close: boolean = false
): void {
	if (close) {
		showSettings.set(false);
		return;
	}
	showSettings.update((value) => !value);
	if (button) button.blur();
}

export function toggleGamePopup(button: HTMLElement | null = null, close: boolean = false): void {
	if (close) {
		showGame.set(false);
		return;
	}
	if (window.innerWidth < 768) alert('Alert: Game cannot be played on small screen!');
	else {
		showGame.update((value) => !value);
		if (button) button.blur();
	}
}

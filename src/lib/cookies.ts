export function setCookie(name: string, value: string) {
	let expires: string = `; expires=${Math.pow(60, 2) * 24}`;
	document.cookie = name + '=' + (value || '') + expires + '; path=/';
}
export function getCookie(name: string) {
	var nameEQ = name + '=';
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}
export function eraseCookie(name: string) {
	document.cookie = name + '=; Max-Age=1;';
}

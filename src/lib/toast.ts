import { writable } from 'svelte/store';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
	id: number;
	message: string;
	type: ToastType;
}

export const toasts = writable<Toast[]>([]);

export function showToast(message: string, type: ToastType = 'success', duration = 3000) {
	const id = Date.now();

	toasts.update((items) => [...items, { id, message, type }]);

	setTimeout(() => {
		toasts.update((items) => items.filter((t) => t.id !== id));
	}, duration);
}

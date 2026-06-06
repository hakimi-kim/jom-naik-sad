import { writable } from 'svelte/store';

export const driverApplicationStatus = writable<'none' | 'pending' | 'approved' | 'rejected'>(
	'none'
);

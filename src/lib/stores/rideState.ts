import { writable } from 'svelte/store';
import type { RideStatus } from '$lib/data/mockData';

export type RideActor = 'driver' | 'passenger';

export interface ActiveRide {
	status: RideStatus;
	actor: RideActor;
	// offer details
	price: number;
	from: string;
	to: string;
	time: string;
	seats: number;
	// people
	passengerName: string;
	driverName: string;
	vehicle: string;
	plate: string;
	rating: number;
}

export const activeRide = writable<ActiveRide | null>(null);

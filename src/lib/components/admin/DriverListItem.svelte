<script lang="ts">
	import { Star } from "lucide-svelte";

	interface Driver {
		id: number;
		name: string;
		vehicle: string;
		rides: number;
		rating: number;
	}

	let { driver }: { driver: Driver } = $props();
</script>

<a
	href={`/admin/drivers/${driver.id}`}
	class="flex items-center justify-between rounded-2xl p-3 transition hover:bg-muted"
>
	<div class="flex items-center gap-3">
		<div
			class="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 font-semibold text-sky-600"
		>
			{driver.name[0]}
		</div>

		<div>
			<p class="font-medium">{driver.name}</p>

			<p class="text-xs text-muted-foreground">
				{driver.vehicle} · {driver.rides} rides
			</p>
		</div>
	</div>

	<div class="flex items-center gap-1">
		<Star size={16}/> 
		<span class="text-sm font-medium">
			<p>{driver.rating}</p>
		</span>
		<span>→</span>
	</div>
</a>
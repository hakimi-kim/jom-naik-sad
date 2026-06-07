<script lang="ts">
	interface PendingDriver {
		id: number;
		name: string;
		matric: string;
		vehicle: string;
		plate: string;
	}

	interface Props {
		driver: PendingDriver;
		onApprove: (id: number) => void;
		onReject: (id: number) => void;
	}

	let { driver, onApprove, onReject }: Props = $props();
</script>

<div class="rounded-2xl border p-4">
	<div class="mb-4">
		<h4 class="font-semibold">{driver.name}</h4>

		<p class="text-xs text-muted-foreground">
			{driver.matric}
		</p>

		<p class="mt-1 text-xs text-muted-foreground">
			{driver.vehicle} · {driver.plate}
		</p>
	</div>

	<div class="flex gap-2">
		<button
			onclick={() => onApprove(driver.id)}
			class="flex-1 rounded-xl bg-green-500 py-2 font-medium text-white"
		>
			✓ Approve
		</button>

		<button
			onclick={() => onReject(driver.id)}
			class="flex-1 rounded-xl border py-2 font-medium"
		>
			✕ Reject
		</button>
	</div>
</div>
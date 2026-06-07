<script lang="ts">
	interface Props {
		index: number;
		name: string;
		rides: number;
		maxRides: number;
	}

	let { index, name, rides, maxRides }: Props = $props();

	const percentage = (rides / maxRides) * 100;
</script>

<div class="space-y-2">
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-3">
			<div
				class="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs"
			>
				{index}
			</div>

			<span>{name}</span>
		</div>

		<span class="text-sm font-medium">
			{rides} rides
		</span>
	</div>

	<div class="h-2 rounded-full bg-muted">
		<div
			class="h-2 rounded-full bg-primary"
			style={`width:${percentage}%`}
		/>
	</div>
</div>
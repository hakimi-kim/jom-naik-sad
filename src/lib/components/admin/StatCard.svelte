<script lang="ts">
	interface Props {
		title: string;
		value: string | number;
		icon?: any;
	}

	let { title, value, icon: Icon }: Props = $props();
</script>

<div class="rounded-3xl border border-border/60 bg-card p-5 shadow-card">
	{#if Icon}
		<div class="mb-3 text-primary">
			<Icon size={20} />
		</div>
	{/if}

	<h3 class="text-2xl font-bold">{value}</h3>

	<p class="text-sm text-muted-foreground">
		{title}
	</p>
</div>
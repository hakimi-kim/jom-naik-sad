<script lang="ts">
	interface Props {
		title: string;
		value: string;
	}

	let { title, value }: Props = $props();
</script>

<div class="rounded-2xl bg-muted p-4">
	<p class="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
		{title}
	</p>

	<p class="font-medium">
		{value}
	</p>
</div>
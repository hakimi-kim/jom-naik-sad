<script lang="ts">
	interface Comment {
		name: string;
		comment: string;
		rating: number;
		ago: string;
	}

	let { comment }: { comment: Comment } = $props();
</script>

<div class="rounded-2xl bg-muted p-4">
	<div class="flex justify-between">
		<p class="font-medium">{comment.name}</p>

		<p class="text-sm">
			{'⭐'.repeat(comment.rating)} · {comment.ago}
		</p>
	</div>

	<p class="mt-2 text-sm text-muted-foreground">
		{comment.comment}
	</p>
</div>
<!-- src/lib/components/ToastContainer.svelte -->

<script lang="ts">
	import { toasts } from '$lib/toast';
</script>

<div class="fixed bottom-6 left-1/2 z-50 flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4 pointer-events-none">
	{#each $toasts as t (t.id)}
		<div
			class="pointer-events-auto flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium shadow-lg
			{t.type === 'success'
				? 'bg-green-600 text-white'
				: t.type === 'error'
					? 'bg-red-500 text-white'
					: 'bg-foreground text-background'}"
		>
			{#if t.type === 'success'}
				<span>✓</span>
			{:else if t.type === 'error'}
				<span>✕</span>
			{:else}
				<span>ℹ</span>
			{/if}

			<span>{t.message}</span>
		</div>
	{/each}
</div>
<script lang="ts">
  import { toasts } from './toast';
</script>

<div class="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 flex-col gap-2 w-full max-w-sm px-4 pointer-events-none">
  {#each $toasts as t (t.id)}
    <div
      class="flex items-center gap-3 rounded-2xl px-4 py-3 shadow-elevated text-sm font-medium animate-fade-in pointer-events-auto
        {t.type === 'success' ? 'bg-secondary text-white' : t.type === 'error' ? 'bg-red-500 text-white' : 'bg-foreground text-background'}"
    >
      {#if t.type === 'success'}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      {/if}
      {t.message}
    </div>
  {/each}
</div>

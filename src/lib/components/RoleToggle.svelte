<script lang="ts">
  type Role = 'passenger' | 'driver';

  let {
    role = $bindable('passenger'),
    onchange
  }: {
    role?: Role;
    onchange?: (r: Role) => void;
  } = $props();

  function select(r: Role) {
    role = r;
    onchange?.(r);
  }
</script>

<div class="grid grid-cols-2 gap-1 rounded-2xl bg-muted p-1 shadow-inner">
  {#each (['passenger', 'driver'] as const satisfies Role[]) as r (r)}
    {@const active = role === r}
    <button
      type="button"
      onclick={() => select(r)}
      class="flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all
        {active ? 'bg-card text-foreground shadow-card' : 'text-muted-foreground hover:text-foreground'}"
    >
      {#if r === 'passenger'}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
        Passenger
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h8l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2z"/><circle cx="12" cy="13" r="2"/></svg>
        Driver
      {/if}
    </button>
  {/each}
</div>

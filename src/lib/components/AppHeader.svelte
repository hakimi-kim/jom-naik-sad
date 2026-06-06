<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';

  let {
    title = 'IIUM Ride',
    showBack = false,
    backHref = ''
  }: {
    title?: string;
    showBack?: boolean;
    backHref?: string;
  } = $props();

  function goBack() {
    if (backHref) goto(backHref);
    else if (history.length > 1) history.back();
    else goto('/dashboard');
  }

  const isHome = $derived(page.url.pathname === '/dashboard');
</script>

<header class="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
  <div class="container flex mx-auto h-16 items-center justify-between gap-3 p-4">
    <div class="flex items-center gap-3">
      {#if showBack && !isHome}
        <button
          onclick={goBack}
          aria-label="Back"
          class="flex h-9 w-9 items-center justify-center rounded-xl text-foreground hover:bg-muted transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        </button>
      {:else}
        <a href="/dashboard" class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-hero text-white shadow-card" aria-label="Open navigation menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h8l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2z"/><circle cx="12" cy="13" r="2"/></svg>
        </a>
      {/if}
      <div class="leading-tight">
        <p class="text-sm font-semibold text-foreground">{title}</p>
        <p class="text-xs text-muted-foreground">Campus transport</p>
      </div>
    </div>
  </div>
</header>

<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import AppHeader from '$lib/components/AppHeader.svelte';
  import { activeRide } from '$lib/stores/rideState';

  let seconds = $state(0);
  let matched = $state(false);

  onMount(() => {
    const interval = setInterval(() => {
      seconds += 1;
      if (seconds >= 5) {
        clearInterval(interval);
        matched = true;
        activeRide.set({
          status: 'MATCHED',
          actor: 'passenger',
          price: 5,
          from: 'IIUM Main Gate',
          to: 'Gombak LRT Station',
          time: '08:30',
          seats: 1,
          passengerName: 'You',
          driverName: 'Ahmad R.',
          vehicle: 'Perodua Myvi',
          plate: 'WXY 1234',
          rating: 4.9,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  function backToDashboard(){
    goto('/passenger-dashboard');
  }

  function handleHandle(){
    goto('/create-request');
  }
</script>

<svelte:head><title>Finding Driver · IIUM Ride</title></svelte:head>

<div class="min-h-screen bg-background pb-12">
  <AppHeader />
  <main class="container mx-auto max-w-lg px-4 py-6 space-y-4">

    {#if !matched}
      <div class="rounded-3xl overflow-hidden bg-gradient-to-br from-sky-400 to-cyan-500 p-8 text-white text-center space-y-4">
        <div class="flex items-center justify-center">
          <div class="h-24 w-24 rounded-full bg-white/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/>
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="white"/>
            </svg>
          </div>
        </div>
        <div>
          <p class="text-lg font-bold">Auto-matching with a driver...</p>
          <p class="text-sm text-white/80">Private ride · no carpooling</p>
        </div>
        <div class="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          Waiting · {seconds}s
        </div>
      </div>

    {:else}
      <div class="rounded-3xl border border-border/60 bg-card p-5 shadow-card space-y-4">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-cyan-500 text-cyan-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div>
            <p class="font-bold text-foreground">Driver matched!</p>
            <p class="text-sm text-muted-foreground">Ahmad R. accepted your request</p>
          </div>
        </div>
        <div class="rounded-2xl border border-border/60 bg-muted/40 px-4 py-3 space-y-1">
          <p class="text-sm font-medium text-foreground">Perodua Myvi · ⭐ 4.9</p>
          <p class="text-xs text-muted-foreground">IIUM Main Gate → Gombak LRT Station · 08:30</p>
          <p class="text-xs text-muted-foreground">RM5 per seat</p>
        </div>
        <button
          onclick={backToDashboard}
          class="h-12 w-full rounded-2xl bg-gradient-to-r from-sky-400 to-cyan-500 text-sm font-bold text-white hover:opacity-95 transition-opacity"
        >
          Back to dashboard
        </button>
      </div>
    {/if}

    <div class="rounded-3xl border border-border/60 bg-card p-5 shadow-card space-y-3">
      <p class="text-sm font-semibold text-foreground">How auto-matching works</p>
      <ul class="space-y-1.5 text-sm text-muted-foreground">
        <li>• You requested a private (non-carpool) ride.</li>
        <li>• System scans drivers heading toward your destination.</li>
        <li>• First eligible driver gets matched automatically.</li>
        <li>• You'll be notified as soon as a driver accepts.</li>
      </ul>
    </div>

    {#if !matched}
      <button
        onclick={handleHandle}
        class="h-12 w-full rounded-2xl border border-border/60 bg-card text-sm font-medium text-foreground hover:bg-muted/50 transition-colors flex items-center justify-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        Cancel search
      </button>
    {/if}

  </main>
</div>
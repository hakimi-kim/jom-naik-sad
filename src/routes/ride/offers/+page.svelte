<script lang="ts">
  import { goto } from '$app/navigation';
  import AppHeader from '$lib/components/AppHeader.svelte';
  import { ArrowLeft } from 'lucide-svelte';
  import { activeRide } from '$lib/stores/rideState';

  import { showToast } from '$lib/toast';

  function selectDriver() {
    activeRide.set({
      status: 'PENDING',
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
    goto('/passenger-dashboard');
    showToast('Ride request created');
  }
</script>


<div class="min-h-screen bg-background pb-12">
  <AppHeader />
  <main class="container mx-auto max-w-lg px-4 py-6 space-y-4">

    <a href="/passenger-dashboard" class="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2">
      <ArrowLeft size={16} /> Back
    </a>

    <div>
      <h1 class="text-2xl font-bold tracking-tight text-foreground">Available drivers</h1>
      <p class="text-sm text-muted-foreground">1 offer matches your route</p>
    </div>

    <div class="rounded-3xl border border-border/60 bg-card p-5 shadow-card space-y-4">
      <!-- Driver header -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">A</div>
          <div>
            <div class="flex items-center gap-1.5">
              <span class="text-sm font-semibold text-foreground">Ahmad R.</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div class="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <span class="text-yellow-400">★</span> 4.9
              <span class="mx-1">·</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="m16 8 5 3v5h-5"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              Perodua Myvi
            </div>
          </div>
        </div>
        <div class="text-right">
          <p class="text-lg font-bold text-foreground">RM5</p>
          <p class="text-xs text-muted-foreground">per seat</p>
        </div>
      </div>

      <!-- Route -->
      <div class="rounded-2xl border border-border/60 bg-muted/30 px-4 py-3 space-y-2">
        <div class="flex items-center gap-2">
          <div class="h-2.5 w-2.5 rounded-full bg-blue-500 shrink-0"></div>
          <p class="text-sm font-medium text-foreground">IIUM Main Gate</p>
        </div>
        <div class="flex items-center gap-2 pl-0.5">
          <div class="ml-[3px] h-5 w-px border-l-2 border-dashed border-border/60"></div>
          <p class="text-xs text-muted-foreground ml-1.5">KICT Building</p>
        </div>
        <div class="flex items-center gap-2">
          <div class="h-2.5 w-2.5 rounded-full bg-green-500 shrink-0"></div>
          <p class="text-sm font-medium text-foreground">Gombak LRT Station</p>
        </div>
      </div>

      <!-- Meta -->
      <div class="flex items-center gap-4 text-xs text-muted-foreground">
        <div class="flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          08:30
        </div>
        <div class="flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          2/4 seats
        </div>
        <div class="flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          1 stop
        </div>
      </div>

      <button
        onclick={selectDriver}
        class="h-12 w-full rounded-2xl bg-gradient-to-r from-sky-400 to-cyan-500 text-sm font-bold text-white hover:opacity-95 transition-opacity"
      >
        Select driver
      </button>
    </div>

    <p class="text-center text-xs text-muted-foreground px-4">
      Don't see a good match?
      <a href="/create-request" class="text-primary font-medium underline underline-offset-2">Post a new offer</a>
      and drivers will come to you.
    </p>

  </main>
</div>
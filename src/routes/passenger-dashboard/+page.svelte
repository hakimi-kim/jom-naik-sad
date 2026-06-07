<script lang="ts">
  import { goto } from '$app/navigation';
  import AppHeader from '$lib/components/AppHeader.svelte';
  import StatusBadge from '$lib/components/StatusBadge.svelte';
  import { activeRide } from '$lib/stores/rideState';
</script>

<svelte:head><title>Dashboard · IIUM Ride</title></svelte:head>

<div class="min-h-screen bg-background pb-12">
  <AppHeader />
  <main class="container mx-auto max-w-2xl space-y-6 px-4 py-6">

    <!-- Greeting -->
    <section>
      <p class="text-sm text-muted-foreground">Assalamualaikum 👋</p>
      <h1 class="mt-1 text-2xl font-bold tracking-tight text-foreground">Where to today?</h1>
    </section>

    <!-- Action cards -->
    <section class="grid gap-4 sm:grid-cols-2">
      <a href="/create-request"
        class="group block rounded-3xl border border-border/60 bg-card p-5 shadow-card transition-all hover:shadow-elevated">
        <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-soft text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </div>
        <h3 class="mt-4 text-base font-semibold text-foreground">Create Request</h3>
        <p class="mt-1 text-sm text-muted-foreground">Find a driver headed your way</p>
      </a>
      <a href="/ride/offers"
        class="group block rounded-3xl border border-border/60 bg-card p-5 shadow-card transition-all hover:shadow-elevated">
        <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary-soft text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
        </div>
        <h3 class="mt-4 text-base font-semibold text-foreground">Browse Offers</h3>
        <p class="mt-1 text-sm text-muted-foreground">See drivers posting routes</p>
      </a>
    </section>

    <!-- Active ride -->
    <section>
      <div class="mb-3 flex items-center justify-between">
        <h2 class="text-sm font-semibold text-foreground">Active ride</h2>
        {#if $activeRide?.status === 'MATCHED'}
          <a href="/ride/active" class="text-xs font-medium text-primary hover:underline">View details →</a>
        {/if}
      </div>

      {#if !$activeRide}
        <!-- Empty -->
        <div class="rounded-3xl border border-dashed border-border/60 bg-card p-6 text-center space-y-1">
          <p class="text-sm font-medium text-foreground">No active ride</p>
          <p class="text-xs text-muted-foreground">Create a request or browse offers to get started.</p>
        </div>

      {:else if $activeRide.status === 'PENDING'}
        <!-- Pending — not clickable -->
        <div class="rounded-3xl border border-border/60 bg-card p-5 shadow-card space-y-3">
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-500"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span class="text-sm font-semibold text-foreground">{$activeRide.from} → {$activeRide.to}</span>
            </div>
            <StatusBadge status="PENDING" />
          </div>
          <!-- Ride summary -->
          <div class="rounded-2xl border border-border/60 bg-muted/30 px-4 py-3 space-y-1 text-xs text-muted-foreground">
            <div class="flex justify-between">
              <span>Driver</span>
              <span class="font-medium text-foreground">{$activeRide.driverName}</span>
            </div>
            <div class="flex justify-between">
              <span>Vehicle</span>
              <span class="font-medium text-foreground">{$activeRide.vehicle} · {$activeRide.plate}</span>
            </div>
            <div class="flex justify-between">
              <span>Time</span>
              <span class="font-medium text-foreground">{$activeRide.time}</span>
            </div>
            <div class="flex justify-between">
              <span>Price</span>
              <span class="font-medium text-foreground">RM {$activeRide.price} / seat</span>
            </div>
          </div>
          <!-- Pending notice -->
          <div class="flex items-start gap-2.5 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 px-4 py-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <div>
              <p class="text-xs font-semibold text-amber-700 dark:text-amber-400">Awaiting driver confirmation</p>
              <p class="text-xs text-amber-600/80 dark:text-amber-500/80 mt-0.5">
                Your booking request has been sent. You'll be notified once the driver confirms.
              </p>
            </div>
          </div>
        </div>

      {:else if $activeRide.status === 'MATCHED'}
        <!-- Matched — clickable -->
        <a href="/ride/active"
          class="block rounded-3xl border border-border/60 bg-card p-5 shadow-card transition-all hover:shadow-elevated">
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-secondary"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              <span class="text-sm font-semibold text-foreground">{$activeRide.from} → {$activeRide.to}</span>
            </div>
            <StatusBadge status="MATCHED" />
          </div>
          <div class="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <span class="inline-flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {$activeRide.time}
            </span>
            <span class="inline-flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              {$activeRide.seats} seat
            </span>
            <span class="inline-flex items-center gap-1.5 font-medium text-foreground">
              RM {$activeRide.price}
            </span>
          </div>
        </a>
      {/if}
    </section>

    <!-- Safety strip -->
    <section class="rounded-3xl bg-gradient-soft p-5">
      <h3 class="text-sm font-semibold text-foreground">Stay safe on every ride</h3>
      <p class="mt-1 text-xs text-muted-foreground">
        All chats unlock only after a match. Share your trip with friends from the ride page.
      </p>
    </section>

  </main>
</div>
<script lang="ts">
	import { goto } from '$app/navigation';
	import AppHeader from '$lib/components/AppHeader.svelte';
	import RoleToggle from '$lib/components/RoleToggle.svelte';
  import StatusBadge from '$lib/components/StatusBadge.svelte';
	import { BadgePlus, Loader } from 'lucide-svelte';
  import { driverApplicationStatus } from '$lib/stores/driverStatus';


  function handleRegisterDriver(e: SubmitEvent) {
    e.preventDefault();

    goto('/register-driver');
  }
</script>

<svelte:head><title>Dashboard – IIUM Ride</title></svelte:head>

<div class="min-h-screen bg-background pb-12">
  <AppHeader />
  <main class="container mx-auto max-w-2xl space-y-6 px-4 py-6">

    <!-- Greeting -->
    <section class="animate-fade-in">
      <p class="text-sm text-muted-foreground">Assalamualaikum 👋</p>
      <h1 class="mt-1 text-2xl font-bold tracking-tight text-foreground">Where to today?</h1>
    </section>

    <!-- Role toggle -->

    <!-- Action cards -->
    <!-- First card: full width, horizontal layout -->
    <section class="space-y-4">
      {#if $driverApplicationStatus === 'pending'}
        <!-- Under review card -->
        <div class="rounded-3xl border border-border/60 bg-blue-400 p-5 shadow-card flex items-center gap-4">
          <div class="flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-blue-500 shadow-sm">
            <Loader size={24}/>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-white">Application under review</h3>
            <p class="mt-0.5 text-sm text-muted-white">Admin will review your details shortly. You'll be notified once approved.</p>
          </div>
        </div>

      {:else if $driverApplicationStatus === 'none'}
        <!-- Original apply as driver card -->
        <div class="group rounded-3xl border border-border/60 bg-blue-400 p-5 shadow-card transition-all hover:shadow-elevated flex items-start gap-4">
          <div class="flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-soft text-primary">
            <BadgePlus />
          </div>
          <div class="flex-1">
            <h3 class="text-base font-semibold text-white">Do you want to register as a driver?</h3>
            <p class="mt-1 text-sm text-muted-white">Earn by driving fellow students. Submit your details for verification</p>
            <button onclick={handleRegisterDriver} class="mt-3 rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-card hover:opacity-90 transition-opacity">
              Apply as Driver
            </button>
          </div>
        </div>
      {/if}

      <!-- Other 2 cards: 2 columns -->
      <div class="grid gap-4 sm:grid-cols-2">
        <a
          href="/create-request"
          class="group block rounded-3xl border border-border/60 bg-card p-5 shadow-card transition-all hover:shadow-elevated"
        >
          <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-soft text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </div>
          <h3 class="mt-4 text-base font-semibold text-foreground">Create Request</h3>
          <p class="mt-1 text-sm text-muted-foreground">Tell drivers where you want to go</p>
        </a>

        <a
          href="/ride/offers"
          class="group block rounded-3xl border border-border/60 bg-card p-5 shadow-card transition-all hover:shadow-elevated"
        >
          <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary-soft text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
              <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
            </svg>
          </div>
          <h3 class="mt-4 text-base font-semibold text-foreground">View Offers</h3>
          <p class="mt-1 text-sm text-muted-foreground">Browse driver offers near you</p>
        </a>
      </div>
    </section>

    <!-- Active ride -->
    <section>
      <div class="mb-3 flex items-center justify-between">
        <h2 class="text-sm font-semibold text-foreground">Active ride</h2>
        <a href="/ride/active" class="text-xs font-medium text-primary hover:underline">View details →</a>
      </div>
      <a
        href="/ride/active"
        class="block rounded-3xl border border-border/60 bg-card p-5 shadow-card transition-all hover:shadow-elevated"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-secondary"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            <span class="text-sm font-semibold text-foreground">IIUM → Gombak LRT Station</span>
          </div>
          <StatusBadge status="MATCHED" />
        </div>
        <div class="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          <span class="inline-flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            2 stops
          </span>
          <span class="inline-flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            1/4 seats
          </span>
          <span class="inline-flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" class="text-warning"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            4.9
          </span>
        </div>
      </a>
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

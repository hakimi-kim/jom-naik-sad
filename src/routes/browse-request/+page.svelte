<script lang="ts">
  import { goto } from '$app/navigation';
  import AppHeader from '$lib/components/AppHeader.svelte';
  import { ArrowLeft, ShieldCheck, Clock, Users } from 'lucide-svelte';
  import { activeRide } from '$lib/stores/rideState';
  import { showToast } from '$lib/toast';

  let bidOpen = $state(false);
  let bidAmount = $state('');
  let bidError = $state('');

  const FLOOR_PRICE = 8;
  const BUDGET_CAP = 15;

  function openBid() { bidOpen = true; }
  function cancelBid() { bidOpen = false; bidAmount = ''; bidError = ''; }

  function checkBid() {
    const v = parseFloat(bidAmount);
    if (!bidAmount) { bidError = ''; return; }
    if (v < FLOOR_PRICE) bidError = `Below floor price of RM ${FLOOR_PRICE}`;
    else if (v > BUDGET_CAP) bidError = `Exceeds passenger budget of RM ${BUDGET_CAP}`;
    else bidError = '';
  }

  let bidValid = $derived(!!bidAmount && !bidError && parseFloat(bidAmount) >= FLOOR_PRICE && parseFloat(bidAmount) <= BUDGET_CAP);

  function submitOffer() {
    if (!bidValid) return;
    activeRide.set({
      status: 'PENDING',
      actor: 'driver',
      price: parseFloat(bidAmount),
      from: 'Mahallah Asma',
      to: 'Sunway Pyramid',
      time: '10:00',
      seats: 2,
      passengerName: 'Aisha K.',
      driverName: 'You',
      vehicle: 'Perodua Myvi',
      plate: 'WXY 1234',
      rating: 4.9,
    });
    goto('/driver-dashboard');
    showToast('Ride offer created');
  }
</script>

<svelte:head><title>Browse Requests · IIUM Ride</title></svelte:head>

<div class="min-h-screen bg-background pb-12">
  <AppHeader />
  <main class="container mx-auto max-w-lg px-4 py-6 space-y-4">

    <a href="/driver-dashboard" class="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2">
      <ArrowLeft size={16} /> Back
    </a>

    <div>
      <h1 class="text-2xl font-bold tracking-tight text-foreground">Browse requests</h1>
      <p class="text-sm text-muted-foreground">1 student needs a ride</p>
    </div>

    <div class="rounded-3xl border border-border/60 bg-card p-5 shadow-card space-y-4">
      <!-- Passenger header -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">A</div>
          <div>
            <div class="flex items-center gap-1.5">
              <span class="text-sm font-semibold text-foreground">Aisha K.</span>
              <ShieldCheck size={14} class="text-green-500" />
            </div>
            <p class="text-xs text-muted-foreground mt-0.5">Verified IIUM student</p>
          </div>
        </div>
        <div class="rounded-xl bg-primary/10 px-3 py-1.5 text-right">
          <p class="text-base font-bold text-primary">≤ RM15</p>
          <p class="text-xs text-primary/70">budget</p>
        </div>
      </div>

      <!-- Route -->
      <div class="rounded-2xl border border-border/60 bg-muted/30 px-4 py-3 space-y-2">
        <div class="flex items-center gap-2">
          <div class="h-2.5 w-2.5 rounded-full bg-blue-500 shrink-0"></div>
          <p class="text-sm font-medium text-foreground">Mahallah Asma</p>
        </div>
        <div class="flex items-center gap-2 pl-0.5">
          <div class="ml-[3px] h-5 w-px border-l-2 border-dashed border-border/60"></div>
        </div>
        <div class="flex items-center gap-2">
          <div class="h-2.5 w-2.5 rounded-full bg-green-500 shrink-0"></div>
          <p class="text-sm font-medium text-foreground">Sunway Pyramid</p>
        </div>
      </div>

      <!-- Meta -->
      <div class="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
        <div class="flex items-center gap-1.5"><Clock size={13} /> 10:00</div>
        <div class="flex items-center gap-1.5"><Users size={13} /> 2 seats</div>
        <span class="rounded-full bg-pink-100 text-pink-700 text-xs font-medium px-2.5 py-0.5 border border-pink-200">Female only</span>
      </div>

      <!-- Bid expansion -->
      {#if bidOpen}
        <div class="border-t border-border/60 pt-4 space-y-3">
          <p class="text-sm text-muted-foreground">
            Floor price <span class="font-semibold text-foreground">RM {FLOOR_PRICE}</span> · Budget cap <span class="font-semibold text-foreground">RM {BUDGET_CAP}</span>
          </p>
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">RM</span>
            <input
              type="number"
              bind:value={bidAmount}
              oninput={checkBid}
              min={FLOOR_PRICE}
              max={BUDGET_CAP}
              placeholder={String(FLOOR_PRICE)}
              class="w-full pl-9 pr-4 py-3 rounded-xl border border-border/60 bg-background text-base font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
            />
          </div>
          {#if bidError}
            <p class="text-xs text-destructive">{bidError}</p>
          {:else if bidAmount}
            <p class="text-xs text-green-600">RM {parseFloat(bidAmount).toFixed(0)} is within range ✓</p>
          {:else}
            <p class="text-xs text-muted-foreground">Enter RM {FLOOR_PRICE} – RM {BUDGET_CAP}</p>
          {/if}
          <button
            onclick={submitOffer}
            disabled={!bidValid}
            class="h-12 w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-sm font-bold text-white hover:opacity-95 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Submit offer
          </button>
          <button
            onclick={cancelBid}
            class="h-10 w-full rounded-2xl border border-border/60 text-sm text-muted-foreground hover:bg-muted/40 transition-colors"
          >
            Cancel
          </button>
        </div>
      {:else}
        <button
          onclick={openBid}
          class="h-12 w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-sm font-bold text-white hover:opacity-95 transition-opacity"
        >
          Make offer
        </button>
      {/if}
    </div>

    <p class="text-center text-xs text-muted-foreground px-4">
      Don't see a good match?
      <a href="/create-offer" class="text-primary font-medium underline underline-offset-2">Post a new offer</a>
      and passengers will find you.
    </p>

  </main>
</div>
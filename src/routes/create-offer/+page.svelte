<script lang="ts">
  import { goto } from '$app/navigation';
  import AppHeader from '$lib/components/AppHeader.svelte';
  import { ArrowLeft, Plus, Trash2 } from 'lucide-svelte';
  import { activeRide } from '$lib/stores/rideState';
  import { LOCATIONS } from '$lib/data/mockData';
  import { showToast } from '$lib/toast';

  type Location = (typeof LOCATIONS)[number];

  // Floor/ceiling for mahallah → LRT routes (hardcoded)
  const FLOOR_PRICE = 8;
  const CEILING_PRICE = 15;

  let pickupValue = $state('');
  let destValue = $state('');
  let pickupOpen = $state(false);
  let destOpen = $state(false);
  let time = $state('');
  let seats = $state('4');
  let price = $state('');
  let stops = $state<string[]>(['']);
  let submitting = $state(false);

  let pickupResults = $derived(filterLocations(pickupValue));
  let destResults = $derived(filterLocations(destValue));

  let priceNum = $derived(parseFloat(price));
  let priceError = $derived(
    price
      ? priceNum < FLOOR_PRICE
        ? `Minimum price is RM ${FLOOR_PRICE}`
        : priceNum > CEILING_PRICE
          ? `Maximum price is RM ${CEILING_PRICE}`
          : ''
      : ''
  );
  let priceValid = $derived(!!price && !priceError);

  function filterLocations(query: string): Location[] {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return LOCATIONS.filter(l =>
      l.name.toLowerCase().includes(q) || l.type.toLowerCase().includes(q)
    ).slice(0, 6);
  }

  function selectPickup(name: string) { pickupValue = name; pickupOpen = false; }
  function selectDest(name: string) { destValue = name; destOpen = false; }
  function handleBlur(field: 'pickup' | 'dest') {
    setTimeout(() => { if (field === 'pickup') pickupOpen = false; else destOpen = false; }, 150);
  }

  function addStop() { stops = [...stops, '']; }
  function removeStop(i: number) { stops = stops.filter((_, idx) => idx !== i); }
  function updateStop(i: number, val: string) {
    stops = stops.map((s, idx) => idx === i ? val : s);
  }

  async function publishOffer() {
    if (!pickupValue || !destValue || !time || !priceValid) return;
    submitting = true;
    await new Promise(r => setTimeout(r, 600));
    activeRide.set({
      status: 'MATCHED',
      actor: 'driver',
      price: priceNum,
      from: pickupValue,
      to: destValue,
      time,
      seats: parseInt(seats),
      passengerName: 'Aisha K.',
      driverName: 'You',
      vehicle: 'Perodua Myvi',
      plate: 'WXY 1234',
      rating: 4.9,
    });
    goto('/driver-dashboard');
    showToast('Ride offer published');
  }
</script>

<svelte:head><title>Create Offer · IIUM Ride</title></svelte:head>

<div class="min-h-screen bg-background pb-12">
  <AppHeader />
  <main class="container mx-auto max-w-2xl px-4 py-6">

    <a href="/driver-dashboard" class="mb-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
      <ArrowLeft size={16} /> Back
    </a>

    <div class="mb-5">
      <h1 class="text-2xl font-bold tracking-tight text-foreground">Create offer</h1>
      <p class="text-sm text-muted-foreground">Post your route and passengers will find you.</p>
    </div>

    <div class="rounded-3xl border border-border/60 bg-card p-5 shadow-card space-y-4">

      <!-- Pickup -->
      <div class="flex items-start gap-3">
        <div class="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
        </div>
        <div class="flex-1">
          <label class="mb-1 block text-sm font-medium text-foreground">Pickup location</label>
          <div class="relative">
            <input type="text" bind:value={pickupValue}
              oninput={() => { pickupOpen = pickupValue.trim().length > 0 && pickupResults.length > 0; }}
              onfocus={() => { if (pickupValue.trim() && pickupResults.length > 0) pickupOpen = true; }}
              onblur={() => handleBlur('pickup')}
              placeholder="Search pickup…" autocomplete="off"
              class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
            />
            {#if pickupOpen}
              <ul class="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
                {#each pickupResults as loc}
                  <li>
                    <button type="button" onmousedown={() => selectPickup(loc.name)}
                      class="flex w-full items-center gap-3 border-b border-border/50 px-4 py-2.5 text-left last:border-0 hover:bg-muted/50 transition-colors">
                      <div>
                        <p class="text-sm font-medium text-foreground">{loc.name}</p>
                        <p class="text-xs text-muted-foreground">{loc.type}</p>
                      </div>
                    </button>
                  </li>
                {/each}
              </ul>
            {/if}
          </div>
        </div>
      </div>

      <!-- Stops (optional, repeatable) -->
      <div class="flex items-start gap-3">
        <div class="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground"><circle cx="12" cy="12" r="4"/></svg>
        </div>
        <div class="flex-1 space-y-2">
          <div class="flex items-center justify-between">
            <label class="text-sm font-medium text-foreground">
              Stops <span class="text-muted-foreground font-normal">· optional</span>
            </label>
            <button type="button" onclick={addStop}
              class="inline-flex items-center gap-1 text-xs text-primary hover:underline">
              <Plus size={13} /> Add stop
            </button>
          </div>
          {#each stops as stop, i}
            <div class="flex items-center gap-2">
              <input type="text" value={stop}
                oninput={(e) => updateStop(i, (e.target as HTMLInputElement).value)}
                placeholder="e.g. KICT Building"
                class="h-10 flex-1 rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
              />
              {#if stops.length > 1}
                <button type="button" onclick={() => removeStop(i)}
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                  <Trash2 size={15} />
                </button>
              {/if}
            </div>
          {/each}
        </div>
      </div>

      <!-- Destination -->
      <div class="flex items-start gap-3">
        <div class="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-500/10">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-cyan-500"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
        </div>
        <div class="flex-1">
          <label class="mb-1 block text-sm font-medium text-foreground">Destination</label>
          <div class="relative">
            <input type="text" bind:value={destValue}
              oninput={() => { destOpen = destValue.trim().length > 0 && destResults.length > 0; }}
              onfocus={() => { if (destValue.trim() && destResults.length > 0) destOpen = true; }}
              onblur={() => handleBlur('dest')}
              placeholder="Search destination…" autocomplete="off"
              class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
            />
            {#if destOpen}
              <ul class="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
                {#each destResults as loc}
                  <li>
                    <button type="button" onmousedown={() => selectDest(loc.name)}
                      class="flex w-full items-center gap-3 border-b border-border/50 px-4 py-2.5 text-left last:border-0 hover:bg-muted/50 transition-colors">
                      <div>
                        <p class="text-sm font-medium text-foreground">{loc.name}</p>
                        <p class="text-xs text-muted-foreground">{loc.type}</p>
                      </div>
                    </button>
                  </li>
                {/each}
              </ul>
            {/if}
          </div>
        </div>
      </div>

      <div class="h-px bg-border/60"></div>

      <!-- Time + Seats -->
      <div class="grid grid-cols-2 gap-3">
        <div class="flex items-start gap-3">
          <div class="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div class="flex-1">
            <label class="mb-1 block text-sm font-medium text-foreground">Departure</label>
            <input type="time" bind:value={time}
              class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition" />
          </div>
        </div>
        <div class="flex items-start gap-3">
          <div class="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div class="flex-1">
            <label class="mb-1 block text-sm font-medium text-foreground">Seats</label>
            <select bind:value={seats}
              class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition">
              <option>1</option><option>2</option><option>3</option><option>4</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Price -->
      <div class="flex items-start gap-3">
        <div class="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>
        <div class="flex-1">
          <label class="mb-1 block text-sm font-medium text-foreground">Price per seat (RM)</label>
          <!-- Floor/ceiling notice -->
          <div class="mb-2 flex items-center gap-2 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 px-3 py-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <p class="text-xs text-amber-700 dark:text-amber-400">Mahallah → LRT: RM {FLOOR_PRICE} min · RM {CEILING_PRICE} max per seat</p>
          </div>
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">RM</span>
            <input type="number" bind:value={price}
              min={FLOOR_PRICE} max={CEILING_PRICE} placeholder={String(FLOOR_PRICE)}
              class="h-11 w-full pl-9 pr-4 rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
            />
          </div>
          {#if priceError}
            <p class="mt-1 text-xs text-destructive">{priceError}</p>
          {:else if price && priceValid}
            <p class="mt-1 text-xs text-green-600">RM {priceNum} is within the allowed range ✓</p>
          {/if}
        </div>
      </div>

      <div class="h-px bg-border/60"></div>

      <button
        type="button"
        onclick={publishOffer}
        disabled={!pickupValue || !destValue || !time || !priceValid || submitting}
        class="h-12 w-full rounded-2xl bg-gradient-to-r from-sky-400 to-cyan-400 text-sm font-bold text-white hover:opacity-95 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {#if submitting}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          Publishing…
        {:else}
          Publish offer
        {/if}
      </button>

    </div>
  </main>
</div>
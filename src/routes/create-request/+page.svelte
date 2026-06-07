<script lang="ts">
  import { goto } from '$app/navigation';
  import AppHeader from '$lib/components/AppHeader.svelte';
	import { Switch } from '$lib/components/ui/switch/index.js';
  import { LOCATIONS } from "$lib/data/mockData";
	import { ArrowLeft } from 'lucide-svelte';
 
  type Location = (typeof LOCATIONS)[number];
 
  // Form state
  let pickupValue = $state('');
  let destValue = $state('');
  let pickupOpen = $state(false);
  let destOpen = $state(false);
  let time = $state('');
  let seats = $state('1');
  let maxPrice = $state('');
  let genderPref = $state('Any');
  let carpooling = $state(false);
 
  // Filtered suggestions
  let pickupResults = $derived(filterLocations(pickupValue));
  let destResults = $derived(filterLocations(destValue));
 
  function filterLocations(query: string): Location[] {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return LOCATIONS.filter(l => {
      const name = l.name.toLowerCase();
      const type = l.type.toLowerCase();
      if (name.includes(q) || type.includes(q)) return true;
      return q.split(/\s+/).every(w => name.includes(w) || type.includes(w));
    }).slice(0, 6);
  }
 
  function selectPickup(name: string) {
    pickupValue = name;
    pickupOpen = false;
  }
 
  function selectDest(name: string) {
    destValue = name;
    destOpen = false;
  }
 
  function handlePickupInput() {
    pickupOpen = pickupValue.trim().length > 0 && pickupResults.length > 0;
  }
 
  function handleDestInput() {
    destOpen = destValue.trim().length > 0 && destResults.length > 0;
  }
 
  function handlePickupFocus() {
    if (pickupValue.trim() && pickupResults.length > 0) pickupOpen = true;
  }
 
  function handleDestFocus() {
    if (destValue.trim() && destResults.length > 0) destOpen = true;
  }
 
  function handleClickOutside(field: 'pickup' | 'dest') {
    // Delay so mousedown on dropdown item fires first
    setTimeout(() => {
      if (field === 'pickup') pickupOpen = false;
      else destOpen = false;
    }, 150);
  }
 
  function handleSubmit(e: Event) {
    e.preventDefault();
    if (!pickupValue || !destValue) {
      alert('Please select a pickup location and destination.');
      return;
    }
    if (carpooling) {
      goto('/ride/offers');
    } else {
      goto('/ride/finding');
    }
  }
</script>
 
<svelte:head><title>Create Ride Request · IIUM Ride</title></svelte:head>
 
<div class="min-h-screen bg-background pb-12">
  <AppHeader />
 
  <main class="container mx-auto max-w-2xl px-4 py-6">
 
    <a href="/passenger-dashboard" class="mb-4">
      <div class="flex items-center">
        <ArrowLeft />
        back
      </div>
    </a>

    <div class="mb-5">
      <h1 class="text-2xl font-bold tracking-tight text-foreground">Create ride request</h1>
      <p class="text-sm text-muted-foreground">Drivers in your area will be notified.</p>
    </div>
 
    <form onsubmit={handleSubmit}>
      <div class="rounded-3xl border border-border/60 bg-card p-5 shadow-card space-y-4">
 
        <div class="flex items-start gap-3">
          <div class="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <div class="flex-1">
            <label for="pickup" class="mb-1 block text-sm font-medium text-foreground">Pickup location</label>
            <div class="relative">
              <input
                id="pickup"
                type="text"
                bind:value={pickupValue}
                oninput={handlePickupInput}
                onfocus={handlePickupFocus}
                onblur={() => handleClickOutside('pickup')}
                placeholder="Search pickup location…"
                autocomplete="off"
                class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
              />
              {#if pickupOpen && pickupResults.length > 0}
                <ul class="absolute left-0 right-0 top-full z-50 mt-1 w-full overflow-hidden rounded-xl border border-border bg-card shadow-lg">
                  {#each pickupResults as loc}
                    <li>
                      <button
                        type="button"
                        onmousedown={() => selectPickup(loc.name)}
                        class="flex w-full items-center gap-3 border-b border-border/50 px-4 py-2.5 text-left last:border-0 hover:bg-muted/50 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 text-muted-foreground"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
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
 
        <div class="flex items-start gap-3">
          <div class="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-500/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-cyan-500"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
          </div>
          <div class="flex-1">
            <label for="destination" class="mb-1 block text-sm font-medium text-foreground">Destination</label>
            <div class="relative">
              <input
                id="destination"
                type="text"
                bind:value={destValue}
                oninput={handleDestInput}
                onfocus={handleDestFocus}
                onblur={() => handleClickOutside('dest')}
                placeholder="Search destination…"
                autocomplete="off"
                class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
              />
              {#if destOpen && destResults.length > 0}
                <ul class="absolute left-0 right-0 top-full z-50 mt-1 w-full overflow-hidden rounded-xl border border-border bg-card shadow-lg">
                  {#each destResults as loc}
                    <li>
                      <button
                        type="button"
                        onmousedown={() => selectDest(loc.name)}
                        class="flex w-full items-center gap-3 border-b border-border/50 px-4 py-2.5 text-left last:border-0 hover:bg-muted/50 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 text-muted-foreground"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
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
 
        <div class="grid grid-cols-2 gap-3">
          <div class="flex items-start gap-3">
            <div class="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div class="flex-1">
              <label for="time" class="mb-1 block text-sm font-medium text-foreground">Time</label>
              <input
                id="time"
                type="time"
                bind:value={time}
                class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
              />
            </div>
          </div>
 
          <div class="flex items-start gap-3">
            <div class="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div class="flex-1">
              <label for="seats" class="mb-1 block text-sm font-medium text-foreground">Seats</label>
              <select
                id="seats"
                bind:value={seats}
                class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>
          </div>
        </div>
 
        <div class="grid grid-cols-2 gap-3">
          <div class="flex items-start gap-3">
            <div class="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <div class="flex-1">
              <label for="maxPrice" class="mb-1 block text-sm font-medium text-foreground">
                Max price (RM) <span class="text-muted-foreground font-normal">· optional</span>
              </label>
              <input
                id="maxPrice"
                type="number"
                bind:value={maxPrice}
                placeholder="e.g. 15"
                min="0"
                class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
              />
            </div>
          </div>
 
          <div class="flex items-start gap-3">
            <div class="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div class="flex-1">
              <label for="genderPref" class="mb-1 block text-sm font-medium text-foreground">
                Gender preference <span class="text-muted-foreground font-normal">· optional</span>
              </label>
              <select
                id="genderPref"
                bind:value={genderPref}
                class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
              >
                <option>Any</option>
                <option>Male only</option>
                <option>Female only</option>
              </select>
            </div>
          </div>
        </div>
 
        <div class="h-px bg-border/60"></div>
 
        <div class="flex items-center gap-3 rounded-2xl border border-border/60 bg-muted px-4 py-3">
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium text-foreground">Open to carpooling?</p>
            <p class="text-xs text-muted-foreground">
              {carpooling
                ? 'Yes — you may share a ride with other passengers.'
                : "No (default) — private ride. We'll auto-match you with one driver."}
            </p>
          </div>
          
          <div class="flex items-center space-x-2">
            <Switch bind:checked={carpooling} />
          </div>
        </div>
 
        <button
          type="submit"
          class="h-13 w-full rounded-2xl bg-gradient-to-r from-sky-400 to-cyan-400 text-base font-bold text-white shadow-card hover:opacity-95 transition-opacity"
        >
          {carpooling ? 'Find a shared ride' : 'Find a private driver'}
        </button>
 
      </div>
    </form>
  </main>
</div>
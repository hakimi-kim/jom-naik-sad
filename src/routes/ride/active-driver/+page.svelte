<script lang="ts">
	import { goto } from '$app/navigation';
  import AppHeader from '$lib/components/AppHeader.svelte';
	import DriverHeader from '$lib/components/DriverHeader.svelte';
	import { ArrowLeft } from 'lucide-svelte';

  function handleChat(){
    goto("/chat");
  }
</script>


<div class="min-h-screen bg-background pb-24">
  <DriverHeader />

  <main class="container mx-auto max-w-lg px-4 py-6 space-y-4">

    <a href="/driver-dashboard" class="mb-4">
      <div class="flex items-center">
        <ArrowLeft />
        back
      </div>
    </a>

    <!-- Header banner -->
    <div class="rounded-3xl overflow-hidden bg-gradient-to-br from-sky-400 to-cyan-500 px-5 py-4 text-white mt-4">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-xs font-medium text-white/70">Ride #IIUM-0421</p>
          <p class="text-xs text-white/70 mt-0.5">SEATS FILLED</p>
          <p class="text-4xl font-bold mt-0.5">1/4</p>
        </div>
        <div class="flex items-center gap-1">
          <div class="h-8 w-8 rounded-full bg-white/30 flex items-center justify-center text-xs font-bold">A</div>
          <div class="h-8 w-8 rounded-full bg-white/30 flex items-center justify-center text-xs font-bold">B</div>
          <div class="h-8 w-8 rounded-full bg-white/30 flex items-center justify-center text-xs font-bold">C</div>
          <div class="h-8 w-8 rounded-full bg-white/30 flex items-center justify-center text-xs font-bold">D</div>
          <div class="ml-2 rounded-full bg-green-400/30 border border-green-300 px-2.5 py-0.5 text-xs font-semibold text-white">
            ● Matched
          </div>
        </div>
      </div>
    </div>

    <!-- Driver card -->
    <div class="rounded-3xl border border-border/60 bg-card px-5 py-4 shadow-card">
      <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Driver</p>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">A</div>
          <div>
            <div class="flex items-center gap-1.5">
              <span class="text-sm font-semibold text-foreground">Ahmad R. · You</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div class="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <span class="text-yellow-400">★</span> 4.9
              <span class="mx-1">·</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="m16 8 5 3v5h-5"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              Perodua Myvi · WXY 1234
            </div>
          </div>
        </div>
        <button class="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:bg-muted/50 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.8a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16a2 2 0 0 1 .27.92z"/></svg>
        </button>
      </div>
    </div>

    <!-- Route card -->
    <div class="rounded-3xl border border-border/60 bg-card px-5 py-4 shadow-card">
      <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">Route</p>
      <div class="space-y-0">
        {#each [
          { label: 'IIUM Main Gate', sub: 'Pickup', time: '08:30', color: '#3b82f6', active: true },
          { label: 'KICT Building', sub: 'Stop', time: '08:35', color: '#d1d5db', active: false },
          { label: 'KL Sentral', sub: 'Stop', time: '08:50', color: '#d1d5db', active: false },
          { label: 'Gombak LRT Station', sub: 'Destination', time: '09:30', color: '#d1d5db#22c55e', active: false },
        ] as stop, i}
          <div class="flex items-start gap-3">
            <div class="flex flex-col items-center">
              <div class="h-3 w-3 rounded-full border-2 mt-1 shrink-0" style="border-color: {stop.color}; background: {stop.active ? stop.color : 'transparent'}"></div>
              {#if i < 3}
                <div class="w-px flex-1 bg-border/60 my-1" style="min-height: 28px"></div>
              {/if}
            </div>
            <div class="flex flex-1 items-start justify-between pb-1">
              <div>
                <p class="text-sm font-medium text-foreground">{stop.label}</p>
                <p class="text-xs text-muted-foreground">{stop.sub}</p>
              </div>
              <p class="text-sm text-muted-foreground">{stop.time}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Passengers card -->
    <div class="rounded-3xl border border-border/60 bg-card px-5 py-4 shadow-card">
      <div class="flex items-center justify-between mb-4">
        <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Passengers</p>
        <div class="flex items-center gap-1 text-xs text-muted-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          Identities anonymized
        </div>
      </div>
      <div class="space-y-3">
        {#each [
          { initial: 'A', label: 'Passenger #1' },
          { initial: 'B', label: 'Passenger #2' },
          { initial: 'C', label: 'Passenger #3' },
          { initial: 'D', label: 'Passenger #4' }
        ] as p}
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-semibold text-foreground">{p.initial}</div>
              <p class="text-sm text-foreground">{p.label}</p>
            </div>

            <div class="flex items-center gap-2">
              <p class="text-sm text-foreground">RM 3</p>
              <button class="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:bg-muted/50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.8a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16a2 2 0 0 1 .27.92z"/></svg>
              </button>
            </div>
          </div>
        {/each}
      </div>
    </div>

  </main>

  <!-- Bottom bar -->
  <div class="fixed bottom-0 left-0 right-0 border-t border-border/60 bg-card px-4 py-3 flex gap-3">
    <button class="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-border/60 bg-background py-3 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
      Share
    </button>
    <button onclick={handleChat} class="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-400 to-cyan-500 py-3 text-sm font-bold text-white hover:opacity-95 transition-opacity">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      Open chat
    </button>
  </div>
</div>
<!-- <script lang="ts">
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
</header> -->

<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { driverApplicationStatus } from '$lib/stores/driverStatus';
  import { onMount } from 'svelte';

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

  // Dropdown state
  let dropdownOpen = $state(false);

  function toggleDropdown() {
    dropdownOpen = !dropdownOpen;
  }

  function closeDropdown() {
    dropdownOpen = false;
  }

  // Close on outside click
  function handleOutsideClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (!target.closest('#user-menu')) {
      dropdownOpen = false;
    }
  }

  onMount(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  });

  // Subtitle under header title
  const roleLabel = $derived(
    $driverApplicationStatus === 'approved' ? 'Driver · Campus Transport' : 'Passenger · Campus Transport'
  );
</script>

<header class="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
  <div class="container flex mx-auto h-16 items-center justify-between gap-3 p-4">

    <!-- Left: logo + title -->
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
        <a href="/dashboard" class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-hero text-white shadow-card" aria-label="Home">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h8l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2z"/><circle cx="12" cy="13" r="2"/></svg>
        </a>
      {/if}
      <div class="leading-tight">
        <p class="text-sm font-semibold text-foreground">{title}</p>
        <p class="text-xs text-muted-foreground">{roleLabel}</p>
      </div>
    </div>

    <!-- Right: user avatar + dropdown -->
    <div class="relative" id="user-menu">
      <button
        onclick={toggleDropdown}
        aria-label="User menu"
        class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary hover:bg-primary/20 transition-colors"
      >
        U
      </button>

      {#if dropdownOpen}
        <!-- Dropdown -->
        <div class="absolute right-0 top-11 z-50 w-56 rounded-2xl border border-border/60 bg-card shadow-elevated overflow-hidden">
          
          <!-- User info -->
          <div class="px-4 py-3 border-b border-border/60">
            <p class="text-sm font-semibold text-foreground">User</p>
            <p class="text-xs text-muted-foreground">user@iium.edu.my</p>
          </div>

          <!-- Menu items -->
          <div class="py-1.5">

            <!-- Edit profile -->
            <button
              onclick={() => { closeDropdown(); goto('/profile'); }}
              class="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              Edit profile
            </button>

            <!-- Driver status item -->
            {#if $driverApplicationStatus === 'none'}
              <button
                onclick={() => { closeDropdown(); goto('/register-driver'); }}
                class="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h8l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2z"/><circle cx="12" cy="13" r="2"/></svg>
                Apply as driver
              </button>

            {:else if $driverApplicationStatus === 'pending'}
              <div class="flex items-center gap-3 px-4 py-2.5 text-sm text-amber-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Driver application pending
              </div>

            {:else if $driverApplicationStatus === 'approved'}
              <!-- Role switcher -->
              <div class="px-4 py-2 border-t border-border/60">
                <p class="text-xs font-semibold text-muted-foreground mb-1.5">Switch role</p>
                <div class="flex flex-col gap-1">
                  <button
                    onclick={() => { closeDropdown(); goto('/dashboard'); }}
                    class="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    Passenger
                  </button>
                  <button
                    onclick={() => { closeDropdown(); goto('/driver/dashboard'); }}
                    class="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h8l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2z"/><circle cx="12" cy="13" r="2"/></svg>
                    Driver
                  </button>
                </div>
              </div>
            {/if}

            <!-- Sign out -->
            <div class="border-t border-border/60 mt-1 pt-1">
              <button
                onclick={() => { closeDropdown(); goto('/login'); }}
                class="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/5 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                Sign out
              </button>
            </div>

          </div>
        </div>
      {/if}
    </div>

  </div>
</header>
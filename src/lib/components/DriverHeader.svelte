<!-- DriverHeader -->
<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { driverApplicationStatus } from '$lib/stores/driverStatus';
  import { onMount } from 'svelte';
  import { Car, Inbox } from 'lucide-svelte';
  import { showToast } from '$lib/toast';

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
    if (!target.closest('#user-menu') && !target.closest('#inbox-menu')) {
      dropdownOpen = false;
      inboxOpen = false;
    }
  }

  onMount(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  });

  // Subtitle under header title
  const roleLabel = $derived(
    $driverApplicationStatus === 'approved' ? 'Driver · Campus Transport' : 'Driver · Campus Transport'
  );

  let inboxOpen = $state(false);

  const notifications = [
    {
      name: 'Admin',
      message: 'You have been approved to become a driver for Jom Naik.',
      isSystem: true
    },
    {
      name: 'Passenger',
      message: 'Have you arrived yet?',
      isSystem: false
    }
  ];

  function toggleInbox() {
    inboxOpen = !inboxOpen;
  }

  function openNotification(notification: (typeof notifications)[0]) {
    inboxOpen = false;

    if (!notification.isSystem) {
      goto('/chat');
    }
  }
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
          <Car class="w-5 h-5"/>
        </button>
      {:else}
        <a href="/driver-dashboard" class="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-700 text-white shadow-card" aria-label="Home">
          <Car class="w-5 h-5"/>
        </a>
      {/if}
      <div class="leading-tight">
        <p class="text-sm font-semibold text-foreground">{title}</p>
        <p class="text-xs text-muted-foreground">Driver · Campus Transport</p>
      </div>
    </div>

    <!-- Right: inbox + user avatar -->
    <div class="flex items-center gap-2">

      <!-- Inbox -->
      <div class="relative" id="inbox-menu">
        <button
          onclick={toggleInbox}
          aria-label="Inbox"
          class="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted transition-colors"
        >
          <Inbox size={18} />

          <!-- Notification badge -->
          <span
            class="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white"
          >
            2
          </span>
        </button>

        {#if inboxOpen}
          <div class="absolute right-0 top-11 z-50 w-80 rounded-2xl border border-border/60 bg-card shadow-elevated overflow-hidden">

            <div class="border-b border-border/60 px-4 py-3">
              <p class="font-semibold text-foreground">Inbox</p>
              <p class="text-xs text-muted-foreground">
                Recent notifications
              </p>
            </div>

            <div class="max-h-80 overflow-y-auto">

              {#each notifications as notification}
                <button
                  onclick={() => openNotification(notification)}
                  class="flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-muted transition-colors"
                >
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {notification.name.charAt(0)}
                  </div>

                  <div class="flex-1">
                    <p class="text-sm font-medium text-foreground">
                      {notification.name}
                    </p>
                    <p class="text-xs text-muted-foreground mt-0.5">
                      {notification.message}
                    </p>
                  </div>
                </button>
              {/each}

            </div>
          </div>
        {/if}
      </div>

      <!-- Existing user menu -->
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
          
          <!-- User info — change "User" to "Driver" -->
          <div class="px-4 py-3 border-b border-border/60">
            <p class="text-sm font-semibold text-foreground">Driver</p>
            <p class="text-xs text-muted-foreground">user@iium.edu.my</p>
          </div>

          <!-- Menu items -->
          <div class="py-1.5">

            <!-- Edit profile -->
            <button
              onclick={() => { closeDropdown(); goto('/profile'); }}
              class="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Edit profile
            </button>

            <!-- Role switcher -->
            <div class="px-4 py-2 border-t border-border/60">
              <p class="text-xs font-semibold text-muted-foreground mb-1.5">Switch role</p>
              <div class="flex flex-col gap-1">
                <button
                  onclick={() => { closeDropdown(); goto('/passenger-dashboard'); }}
                  class="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  Passenger
                </button>
                <button
                  onclick={() => { closeDropdown(); goto('/driver-dashboard'); }}
                  class="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h8l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2z"/><circle cx="12" cy="13" r="2"/></svg>
                  Driver
                </button>
              </div>
            </div>

            <!-- Sign out -->
            <div class="border-t border-border/60 mt-1 pt-1">
              <button
                onclick={() => { closeDropdown(); showToast('Sign out successfully'); goto('/login'); }}
                class="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-red-400 hover:text-white transition-colors"
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
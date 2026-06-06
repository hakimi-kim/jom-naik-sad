<script lang="ts">
  import { goto } from '$app/navigation';
	import { Car } from 'lucide-svelte';

  let email = $state('');
  let password = $state('');

  function handleLogin(e: SubmitEvent) {
    e.preventDefault();

    if (email === 'admin@iium.edu.my' || email === 'admin') {
      // goto('/admin/dashboard');
      goto('/admin-dashboard');

    } else if (email.startsWith('driver')) {
      // e.g. driver@iium.edu.my or driverID
      // goto('/driver/dashboard');
      goto('/driver-dashboard');

    } else {
      // default: passenger
      goto('/passenger-dashboard');
    }
  }
</script>

<svelte:head><title>IIUM Ride – Sign In</title></svelte:head>

<div class="flex min-h-screen flex-col items-center justify-center bg-gradient-soft px-4">
  <div class="mx-auto w-full max-w-md animate-fade-in py-12">

    <div class="mb-8 flex flex-col items-center text-center">
      <div class="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-hero shadow-elevated">
      <div class="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-hero shadow-elevated">
        <Car class="w-5 h-5"/>
      </div>
      </div>
      <h1 class="text-3xl font-bold tracking-tight text-foreground">IIUM Ride</h1>
      <p class="mt-2 text-sm text-muted-foreground">Safe, transparent campus ride-sharing</p>
    </div>

    <div class="rounded-3xl bg-card p-6 shadow-elevated sm:p-8">
      <h2 class="text-xl font-semibold text-foreground">Log In</h2>
      <p class="mt-1 text-sm text-muted-foreground">Sign in with your student credentials and password</p>

      <form onsubmit={handleLogin} class="mt-6 space-y-4">
        <div class="space-y-4">
          <div class="space-y-2">
            <label for="email" class="block text-sm font-medium text-foreground">Student ID or Email</label>
            <input
              id="email"
              type="text"
              bind:value={email}
              placeholder="2210123 or name@iium.edu.my"
              class="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
            />
          </div>

          <div class="space-y-2">
            <label for="password" class="block text-sm font-medium text-foreground">Password</label>
            <input
              id="password"
              type="password"
              bind:value={password}
              class="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
            />
          </div>
        </div>

        <button
          type="submit"
          class="h-12 w-full rounded-xl bg-gradient-hero text-base font-semibold text-white shadow-card hover:opacity-95 transition-opacity"
        >
          Log In 
        </button>
      </form>

      <p class="mt-4 block text-center text-sm text-muted-foreground">
        Don't have an account? <a href="/register" class="hover:text-blue-600 text-black underline">Sign up</a>
      </p>
      <p class="mt-4 text-center text-xs text-muted-foreground">
        By continuing you agree to our community ride-safety guidelines.
      </p>
    </div>

    <div class="mt-6 grid grid-cols-3 gap-3 text-center">
      {#each [
        { label: 'Verified students', icon: 'graduation' },
        { label: 'Safe matching', icon: 'shield' },
        { label: 'Anonymized', icon: 'users' }
      ] as item, itemIdx (itemIdx)}
        <div class="rounded-2xl bg-card/60 p-3 backdrop-blur">
          {#if item.icon === 'graduation'}
            <svg class="mx-auto h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
          {:else if item.icon === 'shield'}
            <svg class="mx-auto h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          {:else}
            <svg class="mx-auto h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          {/if}
          <p class="mt-1.5 text-[11px] font-medium text-muted-foreground">{item.label}</p>
        </div>
      {/each}
    </div>

  </div>
</div>
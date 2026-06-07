<script lang="ts">
  import AppHeader from '$lib/components/AppHeader.svelte';
  import { ArrowLeft, Send } from 'lucide-svelte';

  let newMessage = '';

  const messages = [
    {
      id: 1,
      sender: 'system',
      text: `Your driver is booked. Please be ready at your pickup spot 5 minutes early.\n

Quick Rules for Your Ride:\n

Check Locations: Double-check your pickup and drop-off points.\n

Safety First: Seat belts are required at all times.\n

Keep it Clean: No eating, drinking, smoking, or vaping in the car.\n

Be Respectful: Treat your driver and the vehicle with care.\n

Check Your Things: Don't forget your personal belongings when you leave.\n

Stay in Touch: Let us know ASAP if you have any changes or delays.\n

⚠️ Note: For everyone's safety, drivers can refuse service for aggressive behavior, intoxication, or breaking transport rules.`,
      time: '08:00 AM'
    },
    {
      id: 2,
      sender: 'passenger',
      name: 'Passenger #1',
      text: 'Have you arrived yet?',
      time: '08:26 AM'
    }
  ];
</script>

<svelte:head>
  <title>Ride Chat · Jom Naik</title>
</svelte:head>

<div class="min-h-screen bg-background flex flex-col">

  <AppHeader />

  <!-- Chat Header -->
  <div class="border-b border-border/60 bg-card px-4 py-3">
    <a
      href="/ride/active"
      class="mb-2 flex items-center gap-2 text-sm text-muted-foreground"
    >
      <ArrowLeft size={16} />
      Back
    </a>

    <div class="flex items-center gap-3">
      <div
        class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary"
      >
        P
      </div>

      <div>
        <p class="font-semibold">Passenger #1</p>
        <p class="text-xs text-muted-foreground">
          Matched Ride
        </p>
      </div>
    </div>
  </div>

  <!-- Messages -->
  <div class="flex-1 overflow-y-auto px-4 py-4 space-y-4">

    {#each messages as message}

      {#if message.sender === 'system'}
        <div class="flex justify-end px-4 py-3">
          <div
            class="max-w-sm rounded-2xl bg-muted px-4 py-3 text-sm text-muted-foreground"
          >
            <p class="whitespace-pre-line">{message.text}</p>
            <p class="mt-2 text-right text-[10px]">
              {message.time}
            </p>
          </div>
        </div>

      {:else}
        <div class="flex">
          <div
            class="max-w-xs rounded-2xl border border-border/60 bg-card px-4 py-3"
          >
            <p class="text-xs font-semibold text-primary mb-1">
              {message.name}
            </p>

            <p class="text-sm">
              {message.text}
            </p>

            <p class="mt-2 text-right text-[10px] text-muted-foreground">
              {message.time}
            </p>
          </div>
        </div>
      {/if}

    {/each}

  </div>

  <!-- Input -->
  <div class="border-t border-border/60 bg-card p-4">
    <div class="flex gap-2">
      <input
        bind:value={newMessage}
        placeholder="Type a message..."
        class="flex-1 rounded-2xl border border-border/60 bg-background px-4 py-3 text-sm"
      />

      <button
        class="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-sky-400 to-cyan-500 text-white"
      >
        <Send size={18} />
      </button>
    </div>
  </div>

</div>
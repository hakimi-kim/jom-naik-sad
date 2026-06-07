<script lang="ts">
	import CommentCard from '$lib/components/admin/CommentCard.svelte';
	import DriverInfoCard from '$lib/components/admin/DriverInfoCard.svelte';
	import AdminHeader from '$lib/components/AdminHeader.svelte';
	import { ArrowLeft } from 'lucide-svelte';
  import { showToast } from '$lib/toast';
	import { goto } from '$app/navigation';

	const driver = {
		name: 'Ahmad Razali',
		rides: 142,
		rating: 4.9,
		matric: '2108765',
		email: 'ahmad.r@iium.edu.my',
		phone: '+60 12-345 1100',
		license: 'D2345678',
		vehicle: 'Perodua Myvi',
		plate: 'WXY 1234'
	};

	const comments = [
		{
			name: 'Aisha K.',
			comment: 'Friendly and punctual driver.',
			rating: 5,
			ago: '2 days ago'
		},
		{
			name: 'Zaid I.',
			comment: 'Smooth ride, recommended.',
			rating: 5,
			ago: '1 week ago'
		}
	];

  const reports = [
		{
			name: 'Rowin Atkinson',
			comment: 'Not friendly and not punctual driver.',
			ago: '1 day ago'
		},
	];

function terminateDriver() {
  goto("/admin-dashboard")
	showToast('Driver account terminated', 'error');
}

</script>


<svelte:head>
  <title>Driver Details · IIUM Ride</title>
</svelte:head>

<div class="min-h-screen bg-background pb-12">
  <AdminHeader />

  <main class="container mx-auto max-w-5xl px-4 py-6 space-y-6">
    <a
      href="/admin-dashboard"
      class="mb-2 flex items-center gap-2 text-sm"
    >
      <ArrowLeft size={16} />
      Back
    </a>
    <div class="space-y-6 mt-4">
      <!-- Hero -->
      <section>
        <div class="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-card">
          <img
            src="https://images.unsplash.com/photo-1555215695-3004980ad54e"
            alt=""
            class="h-52 w-full object-cover"
          />
      
          <div class="flex items-center justify-between p-5">
            <div class="flex items-center gap-4">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500 font-bold text-white"
              >
                A
              </div>
      
              <div>
                <h2 class="text-xl font-bold">{driver.name}</h2>
      
                <p class="text-sm text-muted-foreground">
                  {driver.rides} completed rides
                </p>
      
                <p>⭐ {driver.rating}</p>
              </div>
            </div>
      
            <button
              onclick={terminateDriver}
              class="rounded-xl bg-red-500 px-5 py-3 font-medium text-white"
            >
              Terminate Driver
            </button>
          </div>
        </div>
      </section>
    
      <!-- Verified info -->
      <section>
        <div class="rounded-3xl border border-border/60 bg-card shadow-card p-6">
          <h3 class="mb-5 font-semibold">
            Verified Information
          </h3>
      
          <div class="grid gap-4 md:grid-cols-2">
            <DriverInfoCard title="Matric Card" value={driver.matric} />
            <DriverInfoCard title="Driving License" value={driver.license} />
            <DriverInfoCard title="Email" value={driver.email} />
            <DriverInfoCard title="Phone" value={driver.phone} />
            <DriverInfoCard title="Car Model" value={driver.vehicle} />
            <DriverInfoCard title="Plate Number" value={driver.plate} />
          </div>
        </div>
      </section>
    
      <!-- Reports -->
      <section>
        <div class="rounded-3xl border border-border/60 bg-card shadow-card p-6">
          <h3 class="mb-3 font-semibold">
            ⚠ Reports (1)
          </h3>
      
          <div class="rounded-2xl bg-muted p-4">
            <div class="flex justify-between">
              <p class="font-medium">Rowan Atkinson</p>
              <p class="text-sm">
                1 day ago
              </p>
            </div>

            <p class="mt-2 text-sm text-muted-foreground">
              Not friendly and not punctual driver.
            </p>
          </div>
        </div>
      </section>
    
       <!-- Comments -->
      <section>
        <div class="rounded-3xl border border-border/60 bg-card shadow-card p-6">
          <h3 class="mb-4 font-semibold">
            Passenger Comments ({comments.length})
          </h3>
      
          <div class="space-y-4">
            {#each comments as comment}
              <CommentCard {comment} />
            {/each}
          </div>
        </div>
      </section>
    </div>
  </main>
</div>
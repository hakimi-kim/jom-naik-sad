<script lang="ts">
	import DriverListItem from '$lib/components/admin/DriverListItem.svelte';
	import PendingDriverCard from '$lib/components/admin/PendingDriverCard.svelte';
	import RouteCard from '$lib/components/admin/RouteCard.svelte';
	import StatCard from '$lib/components/admin/StatCard.svelte';
  import { Car, Users, NotebookPen, Star } from 'lucide-svelte';
	import AdminHeader from '$lib/components/AdminHeader.svelte';
  import { showToast } from '$lib/toast';

	const drivers = [
		{
			id: 1,
			name: 'Ahmad Razali',
			vehicle: 'Perodua Myvi',
			rides: 142,
			rating: 4.9
		},
		{
			id: 2,
			name: 'Nurul Syafiqah',
			vehicle: 'Honda City',
			rides: 88,
			rating: 4.8
		},
		{
			id: 3,
			name: 'Faisal Aziz',
			vehicle: 'Toyota Vios',
			rides: 51,
			rating: 4.2
		},
		{
			id: 4,
			name: 'Hafiz Mansor',
			vehicle: 'Proton X50',
			rides: 23,
			rating: 5
		}
	];

	let pendingDrivers = $state([
		{
			id: 1,
			name: 'Iman Hakim',
			matric: '2210456',
			vehicle: 'Honda Civic',
			plate: 'DTR 8790'
		},
		{
			id: 2,
			name: 'Sara Latif',
			matric: '2210788',
			vehicle: 'Perodua Bezza',
			plate: 'DSA 4565'
		}
	]);

	const routes = [
		{ name: 'IIUM → Gombak LRT', rides: 421 },
		{ name: 'IIUM → KL Sentral', rides: 312 },
		{ name: 'IIUM → Mid Valley', rides: 248 },
		{ name: 'IIUM → KLIA', rides: 187 },
		{ name: 'IIUM → Sunway Pyramid', rides: 96 }
	];

function approve(id: number) {
	const driver = pendingDrivers.find((d) => d.id === id);

	pendingDrivers = pendingDrivers.filter((d) => d.id !== id);
showToast(`${driver?.name} approved successfully`);
}

function reject(id: number) {
	const driver = pendingDrivers.find((d) => d.id === id);

	pendingDrivers = pendingDrivers.filter((d) => d.id !== id);

showToast(`${driver?.name} registration rejected`, 'error');
}


</script>

<svelte:head>
  <title>Jom Naik!</title>
</svelte:head>

<div class="min-h-screen bg-background pb-12">
  <AdminHeader />

  <main class="container mx-auto max-w-7xl px-4 py-6 space-y-6">
    <section>
      <p class="text-sm text-muted-foreground">
        Admin Panel
      </p>

      <h1 class="mt-1 text-2xl font-bold tracking-tight">
        System Analytics
      </h1>
    </section>

    <div class="space-y-6">
    <!-- Stats -->
      <section>
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Active drivers" value="4" icon={Car} />
          <StatCard title="Passengers" value="2,381" icon={Users} />
          <StatCard title="Rides this month" value="1,247" icon={NotebookPen} />
          <StatCard title="Avg rating" value="4.7" icon={Star} />
        </div>
      </section>
    
      <!-- Drivers + Pending -->
      <section>
        <div class="grid gap-6 lg:grid-cols-2">
          <div class="rounded-3xl border bg-card p-5">
            <div class="mb-4 flex items-center justify-between">
              <h3 class="font-semibold">Registered Drivers</h3>
              <span class="text-xs text-muted-foreground">
                {drivers.length} total
              </span>
            </div>
      
            <div class="space-y-2">
              {#each drivers as driver}
                <DriverListItem {driver} />
              {/each}
            </div>
          </div>
      
          <div class="rounded-3xl border bg-card p-5">
            <div class="mb-4 flex items-center justify-between">
              <h3 class="font-semibold">
                Pending Driver Registrations
              </h3>
      
              <span class="rounded-full bg-orange-100 px-2 py-1 text-xs">
                {pendingDrivers.length}
              </span>
            </div>
      
            <div class="space-y-4">
              {#each pendingDrivers as driver}
                <PendingDriverCard
                  {driver}
                  onApprove={approve}
                  onReject={reject}
                />
              {/each}
            </div>
          </div>
        </div>
      </section>
    
      <!-- Popular Routes -->
      <section>
        <div class="rounded-3xl border border-border/60 bg-card shadow-card p-5">
          <h3 class="mb-5 font-semibold">Most Popular Routes</h3>
      
          <div class="space-y-6">
            {#each routes as route, index}
              <RouteCard
                index={index + 1}
                name={route.name}
                rides={route.rides}
                maxRides={421}
              />
            {/each}
          </div>
        </div>
      </section>
    
      <!-- Warning -->
      <section
        class="rounded-3xl border border-orange-200 bg-orange-50 p-5"
      >
        <h3 class="font-semibold">
          1 Open Report
        </h3>

        <p class="mt-1 text-sm text-muted-foreground">
          Review driver complaints to decide on termination.
        </p>
      </section>
    </div>
  </main>
</div>
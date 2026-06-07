<script lang="ts">
	import { goto } from '$app/navigation';
	import AppHeader from '$lib/components/AppHeader.svelte';
	import { showToast } from '$lib/toast';

	let profile = $state({
		fullName: 'Muhammad Ahmad',
		matricNo: '2210456',
		email: 'ahmad@iium.edu.my',
		phone: '+60 12-345 6789',
		gender: 'Male',
		kulliyyah: 'KICT',
		emergencyContact: '+60 11-888 9999'
	});

	let driverInfo = $state({
		licenseNo: 'D2345678',
		vehicleModel: 'Perodua Myvi',
		plateNumber: 'WXY 1234',
		seats: 4
	});

function saveProfile() {
	showToast('Profile updated successfully');
}

	function cancelChanges() {
		goto("/driver-dashboard")
	}
</script>

<svelte:head>
	<title>Profile · IIUM Ride</title>
</svelte:head>

<div class="min-h-screen bg-background pb-12">
	<AppHeader title="Profile" />

	<main class="container mx-auto max-w-4xl space-y-6 px-4 py-6">

		<!-- Profile Header -->
		<section
			class="rounded-3xl border border-border/60 bg-card p-6 shadow-card"
		>
			<div class="flex flex-col items-center gap-4 sm:flex-row">
				<div
					class="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-3xl font-bold text-primary"
				>
					{profile.fullName[0]}
				</div>

				<div class="flex-1">
					<h1 class="text-2xl font-bold">
						{profile.fullName}
					</h1>

					<p class="text-muted-foreground">
						{profile.email}
					</p>

					<p class="text-sm text-muted-foreground">
						Matric No: {profile.matricNo}
					</p>
				</div>

				<button
					class="rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
				>
					Upload Photo
				</button>
			</div>
		</section>

		<!-- Personal Information -->
		<section
			class="rounded-3xl border border-border/60 bg-card p-6 shadow-card"
		>
			<h2 class="mb-5 text-lg font-semibold">
				Personal Information
			</h2>

			<div class="grid gap-4 md:grid-cols-2">

				<div>
					<label class="mb-1 block text-sm font-medium">
						Full Name
					</label>

					<input
						bind:value={profile.fullName}
						class="w-full rounded-xl border border-border px-4 py-3"
					/>
				</div>

				<div>
					<label class="mb-1 block text-sm font-medium">
						Matric Number
					</label>

					<input
						bind:value={profile.matricNo}
						readonly
						class="w-full rounded-xl border border-border bg-muted px-4 py-3"
					/>
				</div>

				<div>
					<label class="mb-1 block text-sm font-medium">
						Email
					</label>

					<input
						bind:value={profile.email}
						class="w-full rounded-xl border border-border px-4 py-3"
					/>
				</div>

				<div>
					<label class="mb-1 block text-sm font-medium">
						Phone Number
					</label>

					<input
						bind:value={profile.phone}
						class="w-full rounded-xl border border-border px-4 py-3"
					/>
				</div>

				<div>
					<label class="mb-1 block text-sm font-medium">
						Gender
					</label>

					<select
						bind:value={profile.gender}
						class="w-full rounded-xl border border-border px-4 py-3"
					>
						<option>Male</option>
						<option>Female</option>
					</select>
				</div>

				<div>
					<label class="mb-1 block text-sm font-medium">
						Kulliyyah
					</label>

					<input
						bind:value={profile.kulliyyah}
						class="w-full rounded-xl border border-border px-4 py-3"
					/>
				</div>

				<div class="md:col-span-2">
					<label class="mb-1 block text-sm font-medium">
						Emergency Contact
					</label>

					<input
						bind:value={profile.emergencyContact}
						class="w-full rounded-xl border border-border px-4 py-3"
					/>
				</div>

			</div>
		</section>

		<!-- Driver Information -->
		<section
			class="rounded-3xl border border-border/60 bg-card p-6 shadow-card"
		>
			<div class="mb-4 flex items-center justify-between">
				<h2 class="text-lg font-semibold">
					Driver Information
				</h2>

				<span
					class="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700"
				>
					Approved Driver
				</span>
			</div>

			<div class="grid gap-4 md:grid-cols-2">

				<div>
					<label class="mb-1 block text-sm font-medium">
						Driving License
					</label>

					<input
						bind:value={driverInfo.licenseNo}
						class="w-full rounded-xl border border-border px-4 py-3"
					/>
				</div>

				<div>
					<label class="mb-1 block text-sm font-medium">
						Vehicle Model
					</label>

					<input
						bind:value={driverInfo.vehicleModel}
						class="w-full rounded-xl border border-border px-4 py-3"
					/>
				</div>

				<div>
					<label class="mb-1 block text-sm font-medium">
						Plate Number
					</label>

					<input
						bind:value={driverInfo.plateNumber}
						class="w-full rounded-xl border border-border px-4 py-3"
					/>
				</div>

				<div>
					<label class="mb-1 block text-sm font-medium">
						Available Seats
					</label>

					<input
						type="number"
						bind:value={driverInfo.seats}
						class="w-full rounded-xl border border-border px-4 py-3"
					/>
				</div>

			</div>
		</section>

		<!-- Documents -->
		<section
			class="rounded-3xl border border-border/60 bg-card p-6 shadow-card"
		>
			<h2 class="mb-5 text-lg font-semibold">
				Documents
			</h2>

			<div class="grid gap-4 md:grid-cols-2">

				<div class="rounded-2xl border p-4">
					<p class="font-medium">Matric Card</p>

					<p class="mt-1 text-sm text-muted-foreground">
						matric-card.jpg
					</p>

					<button
						class="mt-3 rounded-lg border px-3 py-2 text-sm"
					>
						Replace File
					</button>
				</div>

				<div class="rounded-2xl border p-4">
					<p class="font-medium">Driving License</p>

					<p class="mt-1 text-sm text-muted-foreground">
						license.jpg
					</p>

					<button
						class="mt-3 rounded-lg border px-3 py-2 text-sm"
					>
						Replace File
					</button>
				</div>

			</div>
		</section>

		<!-- Password -->
		<section
			class="rounded-3xl border border-border/60 bg-card p-6 shadow-card"
		>
			<h2 class="mb-5 text-lg font-semibold">
				Security
			</h2>

			<div class="grid gap-4">

				<input
					type="password"
					placeholder="Current Password"
					class="rounded-xl border border-border px-4 py-3"
				/>

				<input
					type="password"
					placeholder="New Password"
					class="rounded-xl border border-border px-4 py-3"
				/>

				<input
					type="password"
					placeholder="Confirm New Password"
					class="rounded-xl border border-border px-4 py-3"
				/>

			</div>
		</section>

		<!-- Actions -->
		<section
			class="flex flex-col gap-3 sm:flex-row sm:justify-end"
		>
			<button
				onclick={cancelChanges}
				class="rounded-xl border border-border px-6 py-3 font-medium"
			>
				Cancel
			</button>

			<button
				onclick={saveProfile}
				class="rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground"
			>
				Save Changes
			</button>
		</section>

	</main>
</div>
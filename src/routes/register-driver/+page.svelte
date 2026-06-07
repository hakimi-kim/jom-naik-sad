<!-- register-driver -->
<script lang="ts">
  import { goto } from '$app/navigation';
  import AppHeader from '$lib/components/AppHeader.svelte';
  import { BadgePlus } from 'lucide-svelte';
  import { driverApplicationStatus } from '$lib/stores/driverStatus';


  type DriverType = 'malaysian' | 'international';

  let driverType: DriverType = $state('malaysian');

  // Personal
  let fullName = $state('');
  let matricNumber = $state('');
  let phone = $state('');
  let email = $state('');
  let nationality = $state('');

  // Malaysian
  let icNumber = $state('');
  let licenseNumber = $state('');
  let licenseClass = $state('');
  let licenseExpiry = $state('');

  // International
  let passportNumber = $state('');
  let passportExpiry = $state('');
  let visaType = $state('');
  let visaExpiry = $state('');
  let foreignLicense = $state('');
  let idpNumber = $state('');
  let idpExpiry = $state('');
  let malaysianLicense = $state('');

  // Vehicle
  let carModel = '';
  let plateNumber = '';
  let carColour = '';
  let seats = '2';
  let carPhoto: File | null = null;
  let carPhotoPreview: string = "https://www.google.com/imgres?q=honda%20car%20images&imgurl=https%3A%2F%2Fc.ndtvimg.com%2F2022-05%2Fqtbvtv9g_car_625x300_13_May_22.jpg&imgrefurl=https%3A%2F%2Fwww.carandbike.com%2Fnews%2Franking-the-10-fastest-honda-sports-cars-ever-2972720&docid=6JPOBwQ9jgqtoM&tbnid=2uKOfCYxLPZfWM&vet=12ahUKEwjb8tCIi_OUAxUuRmcHHdESGTwQnPAOegQIchAB..i&w=1280&h=853&hcb=2&ved=2ahUKEwjb8tCIi_OUAxUuRmcHHdESGTwQnPAOegQIchAB";

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    // TODO: call your API
    driverApplicationStatus.set('pending'); 
    goto('/passenger-dashboard');
  }
</script>

<svelte:head><title>Register as Driver – IIUM Ride</title></svelte:head>

<div class="min-h-screen bg-background pb-12">
  <AppHeader />
  <main class="container mx-auto max-w-2xl space-y-6 px-4 py-6">

    <!-- Header -->
    <section class="flex items-center gap-4">
      <div class="flex h-13 w-13 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-cyan-400 text-white shadow-card">
        <BadgePlus size={24} />
      </div>
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-foreground">Register as a driver</h1>
        <p class="text-sm text-muted-foreground">Submit your details for admin verification.</p>
      </div>
    </section>

    <form onsubmit={handleSubmit} class="space-y-4">
      <div class="rounded-3xl border border-border/60 bg-card p-6 shadow-card space-y-5">

        <!-- Driver type toggle -->
        <div>
          <p class="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Driver type</p>
          <div class="grid grid-cols-2 gap-3">
            <button
              type="button"
              onclick={() => driverType = 'malaysian'}
              class="h-11 rounded-xl border text-sm font-semibold transition-all {driverType === 'malaysian' ? 'bg-gradient-to-r from-sky-400 to-cyan-400 text-white border-transparent shadow-card' : 'bg-background border-border text-muted-foreground'}"
            >
              Malaysian
            </button>
            <button
              type="button"
              onclick={() => driverType = 'international'}
              class="h-11 rounded-xl border text-sm font-semibold transition-all {driverType === 'international' ? 'bg-gradient-to-r from-sky-400 to-cyan-400 text-white border-transparent shadow-card' : 'bg-background border-border text-muted-foreground'}"
            >
            International
            </button>
          </div>
        </div>

        <div class="h-px bg-border/60"></div>

        <!-- Personal info -->
        <div>
          <p class="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Personal information</p>
          <div class="space-y-3">
            <div>
              <label for="fullName" class="mb-1.5 block text-sm font-medium text-foreground">
                Full name (as per {driverType === 'malaysian' ? 'IC' : 'Passport'})
              </label>
              <input id="fullName" type="text" bind:value={fullName} placeholder="e.g. Muhammad Ali bin Abdullah"
                class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition" />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label for="matric" class="mb-1.5 block text-sm font-medium text-foreground">Matric number</label>
                <input id="matric" type="text" bind:value={matricNumber} placeholder="2210123"
                  class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition" />
              </div>
              <div>
                <label for="phone" class="mb-1.5 block text-sm font-medium text-foreground">Phone number</label>
                <input id="phone" type="tel" bind:value={phone} placeholder="+60 12-345 6789"
                  class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition" />
              </div>
              <div>
                <label for="email" class="mb-1.5 block text-sm font-medium text-foreground">Email</label>
                <input id="email" type="email" bind:value={email} placeholder="name@iium.edu.my"
                  class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition" />
              </div>
              <div>
                <label for="nationality" class="mb-1.5 block text-sm font-medium text-foreground">Nationality</label>
                <input id="nationality" type="text" bind:value={nationality} placeholder="e.g. Malaysian, Yemeni"
                  class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition" />
              </div>
            </div>
          </div>
        </div>

        <div class="h-px bg-border/60"></div>

        <!-- Malaysian fields -->
        {#if driverType === 'malaysian'}
        <div>
          <p class="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Malaysian driver details</p>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label for="ic" class="mb-1.5 block text-sm font-medium text-foreground">IC number</label>
              <input id="ic" type="text" bind:value={icNumber} placeholder="990101-01-1234"
                class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition" />
            </div>
            <div>
              <label for="license" class="mb-1.5 block text-sm font-medium text-foreground">Driving license no.</label>
              <input id="license" type="text" bind:value={licenseNumber} placeholder="D1234567"
                class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition" />
            </div>
            <div>
              <label for="licClass" class="mb-1.5 block text-sm font-medium text-foreground">License class</label>
              <select id="licClass" bind:value={licenseClass}
                class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition">
                <option value="">Select class</option>
                <option>Class B (Motorcycle)</option>
                <option>Class D (Car)</option>
                <option>Class DA (Auto)</option>
              </select>
            </div>
            <div>
              <label for="licExpiry" class="mb-1.5 block text-sm font-medium text-foreground">License expiry date</label>
              <input id="licExpiry" type="date" bind:value={licenseExpiry}
                class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition" />
            </div>
          </div>
        </div>
        {/if}

        <!-- International fields -->
        {#if driverType === 'international'}
        <div>
          <p class="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">International driver details</p>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label for="passport" class="mb-1.5 block text-sm font-medium text-foreground">Passport number</label>
              <input id="passport" type="text" bind:value={passportNumber} placeholder="A12345678"
                class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition" />
            </div>
            <div>
              <label for="passportExp" class="mb-1.5 block text-sm font-medium text-foreground">Passport expiry</label>
              <input id="passportExp" type="date" bind:value={passportExpiry}
                class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition" />
            </div>
            <div>
              <label for="visa" class="mb-1.5 block text-sm font-medium text-foreground">Visa type</label>
              <select id="visa" bind:value={visaType}
                class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition">
                <option value="">Select visa type</option>
                <option>Student Visa</option>
                <option>Dependent Visa</option>
                <option>Social Visit Pass</option>
              </select>
            </div>
            <div>
              <label for="visaExp" class="mb-1.5 block text-sm font-medium text-foreground">Visa expiry date</label>
              <input id="visaExp" type="date" bind:value={visaExpiry}
                class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition" />
            </div>
            <div>
              <label for="foreignLic" class="mb-1.5 block text-sm font-medium text-foreground">Home country license no.</label>
              <input id="foreignLic" type="text" bind:value={foreignLicense} placeholder="Foreign license number"
                class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition" />
            </div>
            <div>
              <label for="idp" class="mb-1.5 block text-sm font-medium text-foreground">IDP number (if any)</label>
              <input id="idp" type="text" bind:value={idpNumber} placeholder="International Driving Permit"
                class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition" />
            </div>
            <div>
              <label for="idpExp" class="mb-1.5 block text-sm font-medium text-foreground">IDP expiry date</label>
              <input id="idpExp" type="date" bind:value={idpExpiry}
                class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition" />
            </div>
            <div>
              <label for="myLic" class="mb-1.5 block text-sm font-medium text-foreground">Malaysian license (if obtained)</label>
              <input id="myLic" type="text" bind:value={malaysianLicense} placeholder="Leave blank if none"
                class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition" />
            </div>
          </div>
        </div>
        {/if}

        <div class="h-px bg-border/60"></div>

        <!-- Vehicle info -->
        <div>
          <p class="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Vehicle information</p>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label for="carModel" class="mb-1.5 block text-sm font-medium text-foreground">Car model</label>
              <input id="carModel" type="text" bind:value={carModel} placeholder="e.g. Perodua Myvi"
                class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition" />
            </div>
            <div>
              <label for="plate" class="mb-1.5 block text-sm font-medium text-foreground">Plate number</label>
              <input id="plate" type="text" bind:value={plateNumber} placeholder="WXY 1234"
                class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition" />
            </div>
            <div>
              <label for="colour" class="mb-1.5 block text-sm font-medium text-foreground">Car colour</label>
              <input id="colour" type="text" bind:value={carColour} placeholder="e.g. Silver"
                class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition" />
            </div>
            <div>
              <label for="seats" class="mb-1.5 block text-sm font-medium text-foreground">Seats available</label>
              <select id="seats" bind:value={seats}
                class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>
          </div>

          <!-- Car photo upload -->
          <div class="mt-3">
            <label class="mb-1.5 block text-sm font-medium text-foreground">Car photo</label>
            <label for="carPhoto" class="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-border bg-background p-5 transition hover:border-primary hover:bg-primary-soft">
              {#if carPhotoPreview}
                <img src="https://c.ndtvimg.com/2022-05/qtbvtv9g_car_625x300_13_May_22.jpg"
                alt="Car preview" class="max-h-48 w-full rounded-xl object-cover" />
                <span class="text-xs text-muted-foreground">Tap to change photo</span>
              {:else}
                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                </div>
                <span class="text-sm font-semibold text-foreground">Tap to upload car photo</span>
                <span class="text-xs text-muted-foreground">JPG, PNG or HEIC · max 5MB</span>
              {/if}
            </label>
          </div>
        </div>

        <!-- Submit -->
        <button type="submit"
          class="h-13 w-full rounded-2xl bg-gradient-to-r from-sky-400 to-cyan-400 text-base font-bold text-white shadow-card hover:opacity-95 transition-opacity">
          Submit application
        </button>
        <p class="text-center text-xs text-muted-foreground">
          Your name, matric and email from your passenger profile will be used.
        </p>

      </div>
    </form>
  </main>
</div>
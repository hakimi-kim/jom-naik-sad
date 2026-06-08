<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	// import { Toaster } from 'svelte-sonner';
	import ToastContainer from '$lib/components/ToastContainer.svelte';
	// import Navbar from '$lib/components/Navbar.svelte';

	let { children } = $props();
</script>


<svelte:head>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚗</text></svg>" />
  <title>Jom Naik!</title>
</svelte:head>


<!-- <Navbar /> -->


<div class="bg-background text-foreground min-h-screen">
	{@render children()}
</div>

<ToastContainer />


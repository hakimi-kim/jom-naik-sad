<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	// import { Toaster } from 'svelte-sonner';
	import ToastContainer from '$lib/components/ToastContainer.svelte';
	// import Navbar from '$lib/components/Navbar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>


<!-- <Navbar /> -->


<div class="bg-background text-foreground min-h-screen">
	{@render children()}
</div>

<ToastContainer />


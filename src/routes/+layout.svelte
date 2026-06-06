<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	// import Toaster from '$lib/components/Toaster.svelte';
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

<!-- <Toaster richColors position="top-right" /> -->
<!-- <Toaster/> -->


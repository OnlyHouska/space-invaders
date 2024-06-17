<script>
	//IMPORT components
	import Main from './Main.svelte';
	import Version from './components/version.svelte';
	import Layout from './components/layout.svelte';
</script>

<svelte:head>
	<title>Space Invaders</title>
</svelte:head>

<div>
	<Layout />
	<Main />
	<Version />
</div>

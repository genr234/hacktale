<script lang="ts">
	import Dock from '../../components/Dock.svelte';
	let { children, data } = $props();
</script>

<div class="platform-layout">
	<main>
		{@render children()}
	</main>

	<Dock
		items={[
			{ label: 'Home', href: '/platform/home' },
			{ label: 'Projects', href: '/platform/projects' },
			{ label: 'Shop', href: '/platform/shop' }
		]}
		currency={data.user.currency}
	/>
</div>

<style>
	.platform-layout {
		min-height: 100vh;
		background-color: #0d1117;
		color: #ffffff;
		padding-bottom: 8rem;
	}
</style>

<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	const { items, currency } = $props();
</script>

<div class="dock-container">
	<nav class="dock">
		{#each items as item (item.href)}
			<a href={resolve(item.href)} class="dock-item" class:active={page.url.pathname === item.href}>
				<span class="label">{item.label}</span>
			</a>
		{/each}
		<div class="price-container mx-3">
			<span class="token">🪙</span>
			<span class="amount">{currency}</span>
		</div>
	</nav>
</div>

<style>
	.dock-container {
		position: fixed;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 50;
		pointer-events: none;
	}

	.dock {
		pointer-events: auto;
		display: flex;
		align-items: center;
		padding: 0.4rem;
		background: rgba(18, 24, 31, 0.9);
		backdrop-filter: blur(12px);
		border: 1px solid rgba(129, 102, 50, 0.5);
		border-radius: 9999px;
		box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.6);
	}

	.dock-item {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.6rem 2rem;
		color: rgba(255, 255, 255, 0.7);
		text-decoration: none;
		border-radius: 9999px;
		transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
		min-width: 100px;
	}

	.dock-item:hover {
		color: #ffffff;
		background: rgba(255, 255, 255, 0.05);
	}

	.dock-item.active {
		color: #ffffff;
		background: rgba(84, 133, 180, 0.3);
		box-shadow: inset 0 0 0 1px rgba(139, 174, 203, 0.4);
	}

	.label {
		font-family: 'Lexend', sans-serif;
		font-size: 0.85rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.dock-item.active .label {
		font-weight: 600;
	}

	.price-container {
		display: flex;
		align-items: center;
		gap: 0.3rem;
		background: rgba(129, 102, 50, 0.1);
		padding: 0.15rem 0.6rem;
		border-radius: 999px;
		border: 1px solid rgba(129, 102, 50, 0.2);
	}

	.token {
		font-size: 0.8rem;
	}

	.amount {
		font-family: 'Lexend', sans-serif;
		color: #e2b354;
		font-weight: 700;
		font-size: 1rem;
	}
</style>

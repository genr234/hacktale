<script lang="ts">
	import type { Prize } from '$lib/types';

	let {
		prize,
		onBuy = () => {}
	}: {
		prize: Prize;
		onBuy?: (p: Prize) => void;
	} = $props();
</script>

<div class="prize-card">
	<div class="image-box">
		<img src={prize.image} alt={prize.name} />
	</div>

	<div class="info">
		<h3 class="name">{prize.name}</h3>
		<div class="price-container">
			<span class="token">🪙</span>
			<span class="amount">{prize.price}</span>
		</div>
	</div>

	<button class="purchase-btn" onclick={() => onBuy(prize)}> Purchase </button>
</div>

<style>
	.prize-card {
		background: rgba(18, 24, 31, 0.6);
		backdrop-filter: blur(12px);
		border: 1px solid rgba(129, 102, 50, 0.2);
		border-radius: 16px;
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
		width: 100%;
		position: relative;
		overflow: hidden;
	}

	.prize-card:hover {
		border-color: rgba(129, 102, 50, 0.6);
		background: rgba(22, 29, 38, 0.8);
		box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.6);
	}

	.image-box {
		width: 100%;
		background: radial-gradient(circle at center, rgba(84, 133, 180, 0.1) 0%, transparent 75%);
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
	}

	img {
		width: 100%;
		height: auto;
		max-height: 220px;
		object-fit: contain;
		filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4));
		transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
	}

	.prize-card:hover img {
		transform: scale(1.1) rotate(1deg);
	}

	.info {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.3rem;
		text-align: center;
	}

	.name {
		font-family: 'Lexend', sans-serif;
		color: #ffffff;
		font-size: 1.1rem;
		font-weight: 600;
		margin: 0;
		line-height: 1.2;
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

	.purchase-btn {
		width: 100%;
		padding: 0.75rem;
		background: #816632;
		color: #ffffff;
		border: none;
		border-radius: 10px;
		font-family: 'Lexend', sans-serif;
		font-weight: 700;
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		cursor: pointer;
		transition: all 0.2s ease;
		box-shadow: 0 3px 0 #5a4723;
		margin-top: auto;
	}

	.purchase-btn:hover {
		background: #96773b;
		transform: translateY(-2px);
		box-shadow: 0 5px 0 #5a4723;
	}

	.purchase-btn:active {
		transform: translateY(1px);
		box-shadow: 0 1px 0 #5a4723;
	}
</style>

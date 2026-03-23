<script lang="ts">
	import type { Prize } from '$lib/types';

	interface Props {
		prizes: Prize[];
	}

	let { prizes }: Props = $props();

	let activeIndex: number | null = $state(null);
	let leaveTimer: ReturnType<typeof setTimeout> | null = null;

	const enter = (i: number) => {
		if (leaveTimer) {
			clearTimeout(leaveTimer);
			leaveTimer = null;
		}
		activeIndex = i;
	};

	const leave = (i: number) => {
		leaveTimer = setTimeout(() => {
			if (activeIndex === i) activeIndex = null;
		}, 320);
	};
</script>

<div class="showcase-container">
	{#each prizes as prize, i (i)}
		<div
			class="prize-wrapper"
			class:active={activeIndex === i}
			onmouseenter={() => enter(i)}
			onmouseleave={() => leave(i)}
			role="button"
			tabindex="0"
			style="--tilt: {i % 2 === 0 ? '-5deg' : '5deg'}; --z-index: {i};"
		>
			<img src={prize.image} alt={prize.name || 'Prize'} />
		</div>
	{/each}
</div>

<style>
	.showcase-container {
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		padding: 40px 20px;
		overflow-x: auto;
		scrollbar-width: none;
		-webkit-overflow-scrolling: touch;
		scrollbar-gutter: stable;
	}

	.prize-wrapper {
		position: relative;
		margin: 0 -15px;
		transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		z-index: var(--z-index);
		cursor: pointer;

		transform: rotate(var(--tilt));
		will-change: transform;
	}

	img {
		display: block;
		height: 180px;
		width: auto;
		object-fit: contain;

		filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));

		border-radius: 4px;
		transform: translateZ(0);
		backface-visibility: hidden;
	}

	.prize-wrapper.active {
		z-index: 100;
		transform: scale(1.15) rotate(0deg) translateY(-10px);
	}

	.prize-wrapper.active + .prize-wrapper {
		transform: translateX(30px) rotate(var(--tilt));
	}
</style>

<script lang="ts">
	export let src: string;
	export let initialX: number | string;
	export let initialY: number | string;
	export let initialRotate: number;
	export let delay: number;
	export let width: number = 120;
	export let containerId: string = 'cta';

	let x = 0;
	let y = 0;
	let isDragging = false;
	let zIndex = 10;

	let offset = { x: 0, y: 0 };

	const handlePointerDown = (e: PointerEvent) => {
		e.preventDefault();
		e.stopPropagation();

		const container = document.getElementById(containerId);
		if (!container) return;

		const containerRect = container.getBoundingClientRect();
		const currentMouseX = e.clientX - containerRect.left;
		const currentMouseY = e.clientY - containerRect.top;

		offset = {
			x: currentMouseX - x,
			y: currentMouseY - y
		};

		isDragging = true;
		zIndex = 999;
	};

	const handlePointerMove = (e: PointerEvent) => {
		if (!isDragging) return;

		const container = document.getElementById(containerId);
		if (!container) return;

		const containerRect = container.getBoundingClientRect();

		x = (e.clientX - containerRect.left) - offset.x;
		y = (e.clientY - containerRect.top) - offset.y;
	};

	const handlePointerUp = () => {
		if (isDragging) {
			isDragging = false;
			setTimeout(() => {
				if (!isDragging) zIndex = 10;
			}, 500);
		}
	};
</script>

<svelte:window on:pointermove={handlePointerMove} on:pointerup={handlePointerUp} />

<div
	class="sticker-wrapper"
	class:dragging={isDragging}
	on:pointerdown={handlePointerDown}
	style:width="{width}px"
	style:z-index={zIndex}
	style:left={typeof initialX === 'number' ? initialX + 'px' : initialX}
	style:top={typeof initialY === 'number' ? initialY + 'px' : initialY}
	style:transform="translate({x}px, {y}px) rotate({initialRotate}deg) scale({isDragging ? 1.1 : 1})"
>
	<div class="sticker-animation-container" style:animation-delay="{delay}s">
		<img {src} class="sticker-img" draggable="false" alt="sticker" />
	</div>
</div>

<style>
    @keyframes popIn {
        from { opacity: 0; transform: scale(0); }
        to { opacity: 1; transform: scale(1); }
    }

    .sticker-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        cursor: grab;
        touch-action: none;

        transition: transform 0.1s linear;
    }

    .sticker-animation-container {
        opacity: 0;
        animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }

    .sticker-wrapper.dragging {
        cursor: grabbing;
        transition: none;
    }

    .sticker-img {
        width: 100%;
        height: auto;
        display: block;
        pointer-events: none;
        transition: filter 0.2s ease;

        filter:
                drop-shadow(2px 0 0 white)
                drop-shadow(-2px 0 0 white)
                drop-shadow(0 2px 0 white)
                drop-shadow(0 -2px 0 white)
                drop-shadow(2px 2px 0 white)
                drop-shadow(0 5px 10px rgba(0,0,0,0.1));
    }

    .sticker-wrapper:hover .sticker-img {
        filter:
                drop-shadow(2px 0 0 white)
                drop-shadow(-2px 0 0 white)
                drop-shadow(0 2px 0 white)
                drop-shadow(0 -2px 0 white)
                drop-shadow(0 8px 15px rgba(0,0,0,0.15));
    }

    .sticker-wrapper.dragging .sticker-img {
        filter:
                drop-shadow(2px 0 0 white)
                drop-shadow(-2px 0 0 white)
                drop-shadow(0 2px 0 white)
                drop-shadow(0 -2px 0 white)
                drop-shadow(0 20px 30px rgba(0,0,0,0.25));
    }
</style>
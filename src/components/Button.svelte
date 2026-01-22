<script lang="ts">
	let { onClick = () => {}, children } = $props();
</script>

<button onclick={onClick} class="btn">
	<div class="btn-content">
		<div class="corner top-left"></div>
		<div class="corner top-right"></div>
		<div class="corner bottom-left"></div>
		<div class="corner bottom-right"></div>

		<span class="label">{@render children()}</span>
	</div>
</button>

<style>
    :root {
        --btn-gold: #816632;
        --btn-dark: #12181f;
        --btn-blue: #5485b4;
        --btn-blue-hover: #6393c2;
        --btn-corner: #8baecb;
        --btn-text: #ffffff;
    }

    .btn {
        outline: none;
        background: var(--btn-dark);
        cursor: pointer;

        border: 2px solid var(--btn-gold);
        border-radius: 5px;

        padding: 3px;

        transition: transform 0.1s ease;
    }

    .btn:active {
				opacity: 0.8;
				transform: scale(0.98);
    }

    .btn-content {
        background-color: var(--btn-blue);
        position: relative;
				width: 260px;
				height: 2.6em;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 2px;
        transition: background-color 0.2s;
    }

    .btn:hover .btn-content {
        background-color: var(--btn-blue-hover);
    }

    .label {
        font-family: 'Lexend', sans-serif;
        color: var(--btn-text);
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .corner {
        position: absolute;
        width: 12px;
        height: 12px;
        border-style: solid;
        border-color: var(--btn-corner);
        opacity: 0.8;
    }

    .top-left {
        top: 0;
        left: 0;
        border-width: 5px 0 0 5px;
        border-top-left-radius: 2px;
    }

    .top-right {
        top: 0;
        right: 0;
        border-width: 5px 5px 0 0;
        border-top-right-radius: 2px;
    }

    .bottom-left {
        bottom: 0;
        left: 0;
        border-width: 0 0 5px 5px;
        border-bottom-left-radius: 2px;
    }

    .bottom-right {
        bottom: 0;
        right: 0;
        border-width: 0 5px 5px 0;
        border-bottom-right-radius: 2px;
    }
</style>
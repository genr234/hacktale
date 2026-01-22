<script lang="ts">
	interface Props {
		questions: { q: string; a: string }[]
	}

	let { questions }: Props = $props();

	let openIndex: number | null = $state(null);

	const toggle = (index: number) => {
		openIndex = openIndex === index ? null : index;
	};
</script>

<div class="faq">
	{#each questions as question, i (i)}
		<div class="question-log-item" class:active={openIndex === i}>

			<button
				class="question-header"
				onclick={() => toggle(i)}
			>
				<span class="question-title">{question.q}</span>

				<div class="status-indicator">
					<div class="diamond-shape"></div>
				</div>
			</button>

			<div class="question-body" class:open={openIndex === i}>
				<div class="parchment-content">
					<p>{question.a}</p>
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
    :root {
        --dark: #181a1b;
        --panel: #262b2f;
        --gold: #cfaa6e; 
        --gold-dim: #8a7046;
        --parchment: #e3dac1;
        --ink: #3b3228;
    }

    .faq {
        max-width: 650px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 8px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .question-log-item {
        position: relative;
    }

    .question-header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 18px 24px;

        background: linear-gradient(to bottom, #32383e, var(--panel));
        border: 2px solid var(--gold-dim);
        border-radius: 4px;

        color: #cccccc;
        font-size: 1.1rem;
        font-weight: 700;
        text-align: left;
        cursor: pointer;

        transition: all 0.2s ease;
        z-index: 2;
        position: relative;
    }

    .question-header:hover {
        background: linear-gradient(to bottom, #3e454d, #2f353a);
        border-color: var(--gold);
        color: #ffffff;
    }

    .question-log-item.active .question-header {
        border-color: var(--gold);
        color: var(--gold);
    }

    .status-indicator {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .diamond-shape {
        width: 8px;
        height: 8px;
        background: var(--gold-dim);
        transform: rotate(45deg);
        transition: all 0.3s ease;
    }

    .question-header:hover .diamond-shape {
        background: var(--gold);
    }

    .question-log-item.active .diamond-shape {
        background: #55ff55;
        transform: rotate(225deg) scale(1.2);
    }

    .question-body {
        margin: 0 6px;
        border-left: 2px solid var(--gold-dim);
        border-right: 2px solid var(--gold-dim);
        border-bottom: 2px solid var(--gold-dim);
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        background-color: var(--parchment);

        max-height: 0;
        overflow: hidden;
        opacity: 0;
        transition: max-height 360ms cubic-bezier(.2,.9,.2,1), opacity 200ms ease;
    }

    .question-body.open {
        max-height: 800px;
        opacity: 1;
    }

    .parchment-content {
        padding: 0 24px;
        color: var(--ink);
        font-family: 'Georgia', 'Times New Roman', serif;
        font-size: 1.05rem;
        line-height: 1.6;
        border-top: 1px solid rgba(0,0,0,0.1);
        transition: padding 260ms ease;
    }

    .question-body.open .parchment-content {
        padding: 24px;
    }
</style>
<script lang="ts">
	import * as types from '$lib/types';
	import Prize from '../../../components/Prize.svelte';

	const { data }: { data: { user: types.User; items: types.Prize[] } } = $props();

	let mobile = $state(false);

	if (typeof window !== 'undefined') {
		const checkMobile = () => {
			mobile = window.innerWidth <= 768;
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);
	}
</script>

<div class="flex flex-col p-8">
	<div
		class={mobile
			? 'my-4 grid grid-cols-1 items-stretch justify-center gap-6'
			: 'my-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'}
	>
		{#each data.items as prize (prize.name)}
			<Prize {prize} />
		{/each}
	</div>
</div>

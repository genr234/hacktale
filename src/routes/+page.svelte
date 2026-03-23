<script lang="ts">
	import Button from '../components/Button.svelte';
	import Flag from '../components/Flag.svelte';
	import Prizes from '../components/Prizes.svelte';
	import Faq from '../components/Faq.svelte';
	import type { Prize } from '$lib/types';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	let mobile = $state(false);

	if (typeof window !== 'undefined') {
		const checkMobile = () => {
			mobile = window.innerWidth <= 768;
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);
	}

	const { data }: { data: { authenticated: boolean; prizes: Prize[] } } = $props();
</script>

<Flag />
<header class=""></header>
<div class="flex flex-col items-center justify-center">
	<div
		id="cta"
		class="relative flex h-3/4 w-screen flex-col items-center justify-center border-b-6 border-amber-400 bg-[url(/background.jpg)] bg-cover py-20"
	>
		<img src="/hacktale.png" alt="Logo" class="mb-8 w-3/5" />
		<h1 class={mobile ? 'lexend text-center text-3xl' : 'lexend text-center text-4xl'}>
			Make an Hytale mod... {#if mobile}<div class="pt-2"></div>{/if} <b class="">Get Hytale!</b>
		</h1>
		<Prizes prizes={data.prizes} />
		<div class="flex flex-col items-center justify-center gap-4">
			{#if !data.authenticated}
				<p class="nunito font-light italic">new here?</p>
				<Button onClick={() => (window.location.href = 'https://hackclub.com/slack')}
					>join the slack</Button
				>
				<p class="nunito text-md font-light italic">or</p>
				<Button onClick={() => (window.location.href = '/auth/login')}>log in</Button>
			{:else}
				<Button onClick={() => (window.location.href = '/platform/home')}>dashboard</Button>
			{/if}
		</div>
	</div>
	<div
		class="flex w-screen flex-col items-center justify-center gap-4 bg-black/40 bg-[url(/background2.jpg)] bg-cover px-4 py-20 bg-blend-multiply"
	>
		<h1 class="lexend text-3xl">FAQ</h1>
		<Faq
			questions={[
				{
					q: 'What is this?',
					a: 'Hacktale is an Hack Club event where you can make Hytale mods (Minecraft and Stardew Valley mods are welcome too) to get cool prizes!'
				},
				{ q: 'Who can participate?', a: 'Everyone 18yo or younger can participate!' },
				{
					q: 'When is the deadline for submissions?',
					a: 'More information will come out towards the end of february but if it goes well we might extend it!'
				},
				{ q: 'How much does it cost?', a: 'Nothing!' },
				{
					q: 'Is this real?',
					a: 'Yes! Hack Club (a 501(c)(3) nonprofit organization) makes events like this happen all the time! Check out the full list at ysws.hackclub.com'
				},
				{ q: 'What if I have more questions?', a: 'Join the slack and ask them in #hacktale!' }
			]}
		/>
	</div>
	<div
		class="flex h-20 w-screen items-center justify-center border-t-6 border-amber-400 bg-black/90 text-white"
	>
		<p class="nunito text-center text-sm italic">
			hacktale is run by teenagers for teenagers. <br /> made with ❤️ by ketr4x, genr234 and skydude
		</p>
	</div>
</div>

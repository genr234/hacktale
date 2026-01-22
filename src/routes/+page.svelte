<script>
	import Button from '../components/Button.svelte';
	import Flag from '../components/Flag.svelte';
	import Prizes from '../components/Prizes.svelte';
	import Faq from '../components/Faq.svelte';

	let mobile = $state(false);

	if (typeof window !== 'undefined') {
		const checkMobile = () => {
			mobile = (window.innerWidth <= 768);
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);
	}
</script>

<Flag />
<header class=""></header>
<div class="flex flex-col justify-center items-center">
	<div id="cta" class="relative flex flex-col justify-center items-center py-20 w-screen h-3/4 bg-[url(/background.jpg)] bg-cover border-b-6 border-amber-400">
		<img src="/hacktale.png" alt="Logo" class="w-3/5 mb-8" />
		<h1 class="lexend text-4xl text-center">Make an Hytale mod... {#if mobile}<div class="pt-2"></div>{/if} <b class="">Get Hytale!</b></h1>
		<Prizes prizes={
			[
				{ src: '/prizes/founders.webp', alt: 'Founders Edition' },
				{ src: '/prizes/gold.webp', alt: 'Supporter Edition' },
				{ src: '/prizes/standard.webp', alt: 'Standard Edition' },
			]
		} />
		<div class="flex flex-col justify-center items-center gap-4">
			<p class="nunito italic font-light">new here?</p>
			<Button onClick={() => window.location.href = "https://hackclub.com/slack"}>join the slack</Button>
			<p class="nunito italic text-md font-light">or</p>
			<Button onClick={() => alert('Button Clicked!')}>log in</Button>
		</div>
	</div>
	<div class="py-20 w-screen px-4 flex flex-col justify-center items-center gap-4 bg-[url(/background2.jpg)] bg-black/40 bg-blend-multiply bg-cover">
		<h1>FAQ</h1>
		<Faq questions={
			[
				{ q: 'What is this?', a: 'Hacktale is an Hack Club event where you can make Hytale mods (Minecraft and Stardew Valley mods are welcome too) to get cool prizes!' },
				{ q: 'Who can participate?', a: 'Everyone 18yo or younger can participate!' },
				{ q: 'When is the deadline for submissions?', a: 'Mmore information will come out towards the end of february but if it goes well we might extend it!' },
				{ q: 'How much does it cost?', a: 'Nothing!' },
				{ q: 'Is this real?', a: 'Yes! Hack Club (a 501(c)(3) nonprofit organization) makes events like this happen all the time! Check out the full list at ysws.hackclub.com' },
				{ q: 'What if I have more questions?', a: 'Join the slack and ask them in #hacktale!' }
			]
		} />
	</div>
	<div class="w-screen h-20 bg-black/90 flex justify-center items-center border-t-6 border-amber-400 text-white">
		<p class="nunito text-sm italic">hacktale is run by teenagers for teenagers. made with love by ketr4x, genr234 and skydude</p>
	</div>
</div>
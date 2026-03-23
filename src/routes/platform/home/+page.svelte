<script lang="ts">
	import type { User } from '$lib/types';

	const { data }: { data: { user: User } } = $props();
</script>

<div class="lexend flex flex-col p-8 text-3xl">
	<h1>Welcome back {data.user.name.split(' ')[0]}!</h1>
</div>

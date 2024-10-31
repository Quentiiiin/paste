<script lang="ts">
	import '../app.css';
	let { children } = $props();

</script>


<div class=" bg-zinc-900  text-blue-300 h-8 flex items-center justify-between px-4">
	<a href="/">paste.quentins.space</a>
	<a href="/new">new</a>
</div>
<div class=" bg-zinc-800 content text-zinc-50">
	{@render children()}
</div>

<style>
	.content {
		min-height: calc(100vh - 2rem);
	}
</style>

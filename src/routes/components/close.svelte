<script lang="ts">
	export let close: () => void;
</script>

<div class="absolute right-0 top-0 mr-3 mt-2">
	<button on:click={close}>x</button>
</div>

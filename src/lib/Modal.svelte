<script lang="ts">
	import { fly, fade } from "svelte/transition";
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();
</script>

<div class="modal-bg" transition:fade>
	<div class="modal" transition:fly={{ y: 200 }}>
		<button on:click={() => dispatch("close")}>Close</button>
		<!-- <slot>optional fallback</slot>-->
		<slot />
	</div>
</div>

<style>
	.modal-bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.75);
		z-index: 10;
	}

	.modal {
		background: #eee;
		padding: 2rem;
		border-radius: 16px;
		margin: 1rem;
	}
</style>

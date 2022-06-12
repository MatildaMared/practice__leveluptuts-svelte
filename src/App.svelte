<script lang="ts">
	import Quiz from "./lib/Quiz.svelte";
</script>

<main>
	<h1>Computer Quiz 👩‍💻</h1>
	<div>
		<Quiz />
	</div>
</main>

<style lang="scss">
	:global(body) {
		background-color: #524763;
		font-family: sans-serif;
	}
	h1 {
		color: white;
		text-align: center;
		margin: 2rem 0;
	}
	div {
		width: 80%;
		max-width: 600px;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-inline: auto;
		background-color: white;
		border-radius: 16px;
		padding: 3rem;
	}

	:global(button) {
		background-color: #524763;
		color: white;
		font: inherit;
		padding: 0.75rem 2rem;
		border: none;
		border-radius: 8px;
		margin-bottom: 0.5rem;
		cursor: pointer;
		transition: all 0.2s;
		box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);

		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}

		&:hover {
			background-color: #7d6d95;
			transform: translateY(-2px);
		}
	}
</style>

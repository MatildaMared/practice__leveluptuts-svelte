<script lang="ts">
	import type { Question as IQuestion } from "src/models/Question";
	import Question from "./Question.svelte";

	let quiz = getQuiz();

	async function getQuiz(): Promise<IQuestion[]> {
		const response = await fetch(
			"https://opentdb.com/api.php?amount=10&category=18&type=multiple"
		);
		const quiz = await response.json();
		console.log(quiz);
		return quiz.results;
	}

	function handleClick() {
		quiz = getQuiz();
	}
</script>

<div>
	<button on:click={handleClick}>Get questions</button>

	{#await quiz}
		<p>Loading...</p>
	{:then data}
		{#each data as question}
			<Question {question} />
		{/each}
	{/await}
</div>

<style>
</style>

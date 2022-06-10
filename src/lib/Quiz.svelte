<script lang="ts">
	import type { Question } from "src/models/Question";

	let result = "";
	let correctAnswer = "b";
	let answers = ["a", "b", "c", "d"];
	let quiz = getQuiz();

	function pickAnswer(answer) {
		if (answer === correctAnswer) {
			return (result = "Correct!");
		}
		result = "Oops.. That was wrong!";
	}

	async function getQuiz(): Promise<Question[]> {
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
	{#if result}
		<h4>{result}</h4>
	{:else}
		<p>Please pick an answer...</p>
	{/if}

	{#await quiz}
		<p>Loading...</p>
	{:then data}
		<h3>{data[0].question}</h3>
	{/await}

	{#each answers as answer}
		<button on:click={() => pickAnswer(answer)}
			>Answer {answer.toUpperCase()}</button
		>
	{/each}
</div>

<style>
	h4 {
		color: red;
	}
</style>

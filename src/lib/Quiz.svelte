<script lang="ts">
	import type { Question as IQuestion } from "src/models/Question";
	import Question from "./Question.svelte";

	let quiz = getQuiz();
	let currentQuestion = 0;
	let score = 0;

	async function getQuiz(): Promise<IQuestion[]> {
		const response = await fetch(
			"https://opentdb.com/api.php?amount=10&category=18&type=multiple"
		);
		const quiz = await response.json();
		console.log(quiz);
		return quiz.results;
	}

	function nextQuestion() {
		currentQuestion += 1;
	}

	function resetQuiz() {
		quiz = getQuiz();
		currentQuestion = 0;
		score = 0;
	}

	function addToScore() {
		score += 1;
	}
</script>

<div>
	<button on:click={resetQuiz}>Start New Quiz</button>

	<h3>My Score: {score}</h3>
	<h4>Question #{currentQuestion + 1}</h4>

	{#await quiz}
		<p>Loading...</p>
	{:then data}
		{#each data as question, index}
			{#if index === currentQuestion}
				<Question {addToScore} {nextQuestion} {question} />
			{/if}
		{/each}
	{/await}
</div>

<style>
</style>

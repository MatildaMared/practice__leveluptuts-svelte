<script lang="ts">
	import { fade, blur, fly, slide, scale } from "svelte/transition";
	import { onMount, beforeUpdate, afterUpdate, onDestroy } from "svelte";
	import type { Question as IQuestion } from "src/models/Question";
	import Question from "./Question.svelte";

	let quiz = getQuiz();
	let currentQuestion = 0;
	let score = 0;

	onMount(() => {
		console.log("Mounted!");
	});
	beforeUpdate(() => {
		console.log("Before update!");
	});
	afterUpdate(() => {
		console.log("After update!");
	});

	async function getQuiz(): Promise<IQuestion[]> {
		const response = await fetch(
			"https://opentdb.com/api.php?amount=10&category=18&type=multiple"
		);
		const quiz = await response.json();
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

	// Reactive statement
	$: if (score > 7) {
		alert("You won!");
		resetQuiz();
	}

	// Reactive decearation
	$: questionNumber = currentQuestion + 1;
</script>

<div>
	<button on:click={resetQuiz}>Start New Quiz</button>

	<h3>My Score: {score}</h3>
	<h4>Question #{questionNumber}</h4>

	{#await quiz}
		<p>Loading...</p>
	{:then data}
		{#each data as question, index}
			{#if index === currentQuestion}
				<div
					in:fly={{ x: 100 }}
					out:fly={{ x: -200 }}
					class="fade-wrapper"
				>
					<Question {addToScore} {nextQuestion} {question} />
				</div>
			{/if}
		{/each}
	{/await}
</div>

<style>
	.fade-wrapper {
		position: absolute;
	}
</style>

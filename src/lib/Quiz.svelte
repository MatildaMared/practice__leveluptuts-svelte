<script lang="ts">
	import { fly } from "svelte/transition";
	import type { Question as IQuestion } from "src/models/Question";
	import Question from "./Question.svelte";
	import Modal from "./Modal.svelte";
	import { score } from "../store";

	let quiz = getQuiz();
	let currentQuestion = 0;
	let showModal = false;

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
		showModal = false;
		currentQuestion = 0;
		score.set(0);
		quiz = getQuiz();
	}

	// Reactive statement
	$: if ($score > 2) {
		showModal = true;
	}

	// Reactive decearation
	$: questionNumber = currentQuestion + 1;
</script>

<h3>My Score: {$score}</h3>
<h4>Question #{questionNumber}</h4>

<div class="container">
	{#await quiz}
		<p>Loading...</p>
	{:then data}
		{#each data as question, index}
			{#if index === currentQuestion}
				<div
					in:fly={{ y: -100 }}
					out:fly={{ y: 200 }}
					class="fade-wrapper"
				>
					<Question {nextQuestion} {question} />
				</div>
			{/if}
		{/each}
	{/await}
	<button on:click={resetQuiz}>Start New Quiz</button>
</div>

{#if showModal}
	<Modal on:close={resetQuiz}>
		<h3>You won!</h3>
		<p>Congratulations 🥳</p>
		<button on:click={resetQuiz}>Start New Quiz</button>
	</Modal>
{/if}

<style lang="scss">
	.fade-wrapper {
		position: fixed;
		margin-inline: auto;
	}

	.container {
		width: 100%;
		min-height: 500px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	button {
		position: absolute;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		background-color: #7d6d95;

		&:hover {
			opacity: 0.8;
			transform: translateX(-50%) translateY(-2px);
		}
	}
</style>

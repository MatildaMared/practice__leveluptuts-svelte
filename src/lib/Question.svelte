<script lang="ts">
	import type { Question } from "../models/Question";
	import { score } from "../store";
	export let question: Question;
	export let nextQuestion: () => void;
	let isCorrect: boolean;
	let isAnswered = false;

	interface Answer {
		answer: string;
		isCorrect: boolean;
	}

	let answers: Answer[] = question.incorrect_answers.map((answer) => {
		return {
			answer: answer,
			isCorrect: false,
		};
	});

	let allAnswers: Answer[] = shuffle([
		...answers,
		{ answer: question.correct_answer, isCorrect: true },
	]);

	function shuffle(array: Answer[]) {
		const shuffledArray = [...array];
		return shuffledArray.sort(() => Math.random() - 0.5);
	}

	function checkQuestion(correct) {
		isAnswered = true;
		isCorrect = correct;
		if (correct) {
			score.update((score) => score + 1);
		}
	}
</script>

<section>
	<h3>{@html question.question}</h3>

	{#if isAnswered}
		<h5 class:correct={isCorrect}>
			{#if isCorrect}
				You got it right! 🥳
			{:else}
				You goofed up... 😨
			{/if}
		</h5>
	{/if}

	{#each allAnswers as answer}
		<button
			class={isAnswered && (answer.isCorrect ? "correct" : "incorrect")}
			on:click={() => checkQuestion(answer.isCorrect)}
			disabled={isAnswered}
		>
			{@html answer.answer}</button
		>
	{/each}

	{#if isAnswered}
		<div>
			<button on:click={nextQuestion}>Next Question</button>
		</div>
	{/if}
</section>

<style lang="scss">
	section {
		box-sizing: border-box;
		margin: 0 auto;
		width: 600px;
		text-align: center;
		padding: 2rem;
		border: 1px dashed rgba(160, 140, 190);
		border-radius: 8px;
	}
	button {
		display: block;
		&.correct {
			background-color: green;
		}

		&.incorrect {
			background-color: red;
		}
	}

	h5.correct {
		color: green;
	}
</style>

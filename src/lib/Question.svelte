<script lang="ts">
	import type { Question } from "../models/Question";
	export let question: Question;
	export let addToScore: () => void;
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
			addToScore();
		}
	}
</script>

<h3>{@html question.question}</h3>

{#if isAnswered}
	<h5>
		{#if isCorrect}
			You got it right! 🥳
		{:else}
			You goofed up... 😨
		{/if}
	</h5>
{/if}

{#each allAnswers as answer}
	<button on:click={() => checkQuestion(answer.isCorrect)}
		>{@html answer.answer}</button
	>
{/each}

{#if isAnswered}
	<div>
		<button on:click={nextQuestion}>Next Question</button>
	</div>
{/if}

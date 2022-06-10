<script lang="ts">
	import type { Question } from "../models/Question";
	export let question: Question;
	let isCorrect;
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

	function checkQuestion(boolean) {
		isAnswered = true;
		isCorrect = boolean;
	}
</script>

<h3>{@html question.question}</h3>

{#if isAnswered}
	<h4>
		{#if isCorrect}
			You got it right! 🥳
		{:else}
			You goofed up... 😨
		{/if}
	</h4>
{/if}

{#each allAnswers as answer}
	<button on:click={() => checkQuestion(answer.isCorrect)}
		>{@html answer.answer}</button
	>
{/each}

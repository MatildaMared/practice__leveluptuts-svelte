<script lang="ts">
	import type { Question } from "../models/Question";
	export let question: Question;

	let answers = question.incorrect_answers;
</script>

<h3>{@html question.question}</h3>

{#each answers as answer}
	<button>{@html answer}</button>
{/each}

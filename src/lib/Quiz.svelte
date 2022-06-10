<script>
	let result = "";
	let correctAnswer = "b";
	let answers = ["a", "b", "c", "d"];
	const quiz = getQuiz();

	function pickAnswer(answer) {
		if (answer === correctAnswer) {
			return (result = "Correct!");
		}
		result = "Oops.. That was wrong!";
	}

	async function getQuiz() {
		const response = await fetch(
			"https://opentdb.com/api.php?amount=10&category=18&type=multiple"
		);
		const quiz = await response.json();
		console.log(quiz);
		return quiz;
	}
</script>

<div>
	<button on:click={getQuiz}>Get questions</button>
	{#if result}
		<h4>{result}</h4>
	{:else}
		<p>Please pick an answer...</p>
	{/if}

	<!-- <h3>{quiz.results[0].question}</h3> -->

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

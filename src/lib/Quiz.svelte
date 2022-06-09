<script>
	let result = "";
	let correctAnswer = "b";
	let answers = ["a", "b", "c", "d"];

	function pickAnswer(answer) {
		if (answer === correctAnswer) {
			return (result = "Correct!");
		}
		result = "Oops.. That was wrong!";
	}
</script>

<div>
	{#if result}
		<h4>{result}</h4>
	{:else}
		<p>Please pick an answer...</p>
	{/if}
	{#each answers as answer}
		<button on:click={() => pickAnswer(answer)}
			>Answer {answer.toUpperCase()}</button
		>
	{/each}
</div>

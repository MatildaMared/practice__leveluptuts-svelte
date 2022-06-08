<script>
	let result = "";
	let correctAnswer = "B";

	function pickAnswer(answer) {
		if (answer === correctAnswer) {
			return (result = "Correct!");
		}
		result = "Oops.. That was wrong!";
	}
</script>

<div>
	<h4>Result: {result}</h4>
	<button on:click={() => pickAnswer("A")}>Answer A</button>
	<button on:click={() => pickAnswer("B")}>Answer B</button>
	<button on:click={() => pickAnswer("C")}>Answer C</button>
	<button on:click={() => pickAnswer("D")}>Answer D</button>
</div>

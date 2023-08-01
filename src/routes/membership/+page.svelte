<script>
	/** @type {import('./$types').ActionData} */
	export let form;
	export let data;

	let selectedMembership = 'year';
</script>

<h1>Become a member!</h1>

{#if !form?.success}
	<form method="POST">
		<label>
			Name:
			<input required name="name" type="text" />
		</label>
		<label>
			Email:
			<input required name="email" type="email" />
		</label>

		<fieldset>
			<legend>Choose membership type</legend>

			<label
				><input
					name="membershipType"
					bind:group={selectedMembership}
					type="radio"
					value="year"
					required
				/>Full-year membership (1stJuly 2023 - 30th June 2024)
			</label>
			<label
				><input
					name="membershipType"
					bind:group={selectedMembership}
					type="radio"
					value="year_reduced"
					required
				/>Full-year membership (1stJuly 2023 - 30th June 2024) - Reduced price<sup>*</sup>
			</label>
			<label
				><input
					name="membershipType"
					bind:group={selectedMembership}
					type="radio"
					value="semester"
				/>Semester membership (1st July2023 - 31th December 2023)
			</label>
			<label
				><input
					name="membershipType"
					bind:group={selectedMembership}
					type="radio"
					value="semester_reduced"
				/>Semester membership (1st July2023 - 31th December 2023) - Reduced Price<sup>*</sup>
			</label>

			<p>
				<sup>*</sup> Reduced price is only available for students, pensioners and unemployed persons.
			</p>
		</fieldset>

		<div class="line" />
		<p class="total">Price: NOK {data.prices[selectedMembership]}</p>
		<button class="vipps_button" formaction="?/payWithVipps"
			><img alt="" src="/vipps_english.svg" /></button
		>
		<button class="card_button" formaction="?/payWithCard">Pay with card</button>
	</form>
{/if}

{#if form?.success}
	<p>Successfully registered!</p>
{/if}

{#if form?.error}
	<p>Something went wrong!</p>
{/if}

<style>
	label {
		display: block;
		margin: 0.5rem 0;
	}

	.line {
		margin-top: 3rem;
		width: 100%;
		border-top: 3px solid white;
	}

	.total {
		font-size: 2.5rem;
	}

	button {
		display: block;
		margin: 1rem 0;
	}

	.vipps_button {
		background: none;
		border: none;
	}

	.card_button {
		font-size: 1.2rem;
		background-color: #ddd;
		border: none;
		color: black;
		padding: 10px 20px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		margin: 4px 2px;
		cursor: pointer;
		border-radius: 25px;
	}
</style>

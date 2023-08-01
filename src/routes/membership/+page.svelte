<script>
	import tnc from './tnc.svelte';

	import Icon from 'svelte-icons-pack/Icon.svelte';
	import AiOutlineCreditCard from 'svelte-icons-pack/ai/AiOutlineCreditCard';
	import Tnc from './tnc.svelte';

	/** @type {import('./$types').ActionData} */
	export let form;
	export let data;

	let selectedMembership = 'year';
</script>

<h1>Become a member!</h1>

<Tnc />

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
				<sup>*</sup> Reduced price is only available for students, children, pensioners and unemployed
				persons.
			</p>
		</fieldset>

		<div class="line" />
		<p class="total">Price: NOK {data.prices[selectedMembership]}</p>
		<div class="buttons">
			<button class="vipps_button" formaction="?/payWithVipps"
				><img alt="" src="/vipps_english.svg" />
			</button><span> or </span>
			<button class="card_button" formaction="?/payWithCard"
				>Pay with card&nbsp<Icon className="foo" src={AiOutlineCreditCard} /></button
			>
		</div>
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

	.tandc {
		background-color: whitesmoke;
		color: black;
		font-family: monospace;
		padding: 1rem;
		margin-bottom: 3rem;
	}

	.total {
		font-size: 2.5rem;
	}

	button {
		cursor: pointer;
	}

	.buttons {
		display: flex;
		align-items: center;
	}

	.vipps_button {
		background: none;
		border: none;
	}

	fieldset {
		margin-top: 3rem;
	}

	.card_button {
		display: flex;
		align-items: center;
		align-content: space-between;
		font-size: 1.1rem;
		background-color: #ddd;
		border: none;
		color: black;
		padding: 10px 20px;
		text-align: center;
		text-decoration: none;
		border-radius: 25px;
		height: 44px;
		margin-left: 0.5rem;
	}
</style>

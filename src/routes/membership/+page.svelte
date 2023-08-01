<script>
	/** @type {import('./$types').ActionData} */
	export let form;
	export let data;

	let selectedMembership = 'year';
</script>

<h1>Become a member!</h1>

<div class="tandc">
	<h2>Terms and conditions</h2>
	<p>
		Paragraph 1: In accordance with the provisions set forth in the aforementioned agreement, the
		undersigned party shall hereby indemnify and hold harmless all parties involved from any and all
		claims, damages, or liabilities arising out of or in connection with the execution of this
		contract. Furthermore, it is hereby acknowledged that any breach of the terms and conditions
		outlined herein shall result in the immediate termination of this agreement, without prejudice
		to any other rights or remedies available to the aggrieved party.
	</p>
	<p>
		Paragraph 2: This document serves as an addendum to the existing legal agreement between the
		parties hereto. The parties agree to promptly and diligently perform all obligations set forth
		in said agreement, and furthermore, shall refrain from engaging in any action or conduct that
		may be deemed in violation of the terms and conditions stipulated herein. Any failure to comply
		with the provisions contained herein may result in legal action, including but not limited to,
		the seeking of injunctive relief and the recovery of damages incurred as a direct result of the
		breach.
	</p>
	<p>
		Paragraph 3: Notwithstanding any provision to the contrary contained herein, all disputes
		arising out of or relating to this agreement shall be subject to binding arbitration in
		accordance with the rules and regulations set forth by the American Arbitration Association. The
		selected arbitrator shall have the authority to
	</p>

	<p>
		By becoming a member of Trondheim Bike Kitchen, you commit to the following code of conduct:
	</p>
	<ul>
		<li>Respect people, bicycles and tools at the bike kitchen.</li>
		<li>Make sure your bike is clean before you bring it inside.</li>
		<li>Take good care of tools and clean up after yourself.</li>
		<li>Help others and share your knowledge.</li>
	</ul>
	<p>ALL PARTICIPATION IN ACTIVITIES AT THE BIKE KITCHEN IS AT YOUR OWN RISK.</p>
	<p>
		If the code of conduct is not respected, you will have to leave the premises and the Bike
		Kitchen's activities, and you risk losing your membership.
	</p>
</div>

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
			<button class="card_button" formaction="?/payWithCard">Pay with card</button>
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

	.card_button {
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

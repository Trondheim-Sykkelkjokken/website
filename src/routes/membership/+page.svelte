<script>
	// @ts-ignore, as there is no type definition for svelte-icons-pack
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import AiOutlineCreditCard from 'svelte-icons-pack/ai/AiOutlineCreditCard';
	import Terms from './terms.svelte';
	import memberships_data from '../../config/memberships.json';
	import { calculateStartDate, calculateExpiryDate } from '$lib/utils/memberships';
	let memberships = memberships_data.memberships;
	let selectedMembership = 'full-regular';
</script>

<h1>Become a member!</h1>
<Terms />

<form method="POST">
	<h2>Sign up</h2>

	<label>
		Full name:<br />
		<input required name="name" type="text" style="width: 100%; max-width: 300px;" />
	</label>

	<label>
		Email:<br />
		<input required name="email" type="email" style="width: 100%; max-width: 300px;" />
	</label>

	<fieldset>
		<legend>Membership type:</legend>

		<ul>
		  <li>Full-year: July–June</li>
		  <li>Semester: July–December or January–June</li>
		</ul>

		<p>Reduced price offered to students, seniors, children and unemployed.</p>

		{#each memberships as membership}
			<label
				><input
					name="membershipType"
					bind:group={selectedMembership}
					type="radio"
					value={membership.id}
					required
				/>
				{membership.name}{membership.reduced ? ' (reduced)' : ''}: {membership.price} kr
			</label>
		{/each}
	</fieldset>

	<p class="total">Price: {memberships.find((m) => m.id === selectedMembership)?.price} kr</p>
	<div class="buttons">
		<button class="vipps_button" formaction="?/payWithVipps" aria-label="Pay with Vipps"
			><img alt="" src="/vipps_english.svg" />
		</button><span> or </span>
		<button class="card_button" formaction="?/payWithCard" aria-label="Pay with card"
			>Pay with card&nbsp<Icon src={AiOutlineCreditCard} /></button
		>
	</div>
</form>

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
		font-size: 2.0rem;
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
		background-color: #46d919;
		border: none;
		color: #393939;
		padding: 10px 20px;
		text-align: center;
		text-decoration: none;
		border-radius: 25px;
		height: 44px;
		margin-left: 0.5rem;
		font-weight: 500;
	}
</style>

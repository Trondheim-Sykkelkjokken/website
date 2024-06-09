<script>
	// @ts-ignore, as there is no type definition for svelte-icons-pack
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import AiOutlineCreditCard from 'svelte-icons-pack/ai/AiOutlineCreditCard';
	import Terms from './terms.svelte';
	import memberships_data from '../../config/memberships.json';
	import { calculateStartDate, calculateExpiryDate } from '$lib/utils/memberships';
	let memberships = memberships_data.memberships;

	let selectedMembership = 'full-regular';

	// @ts-ignore
	function formatMembershipName(membership) {
		let reduced = membership.reduced ? '(reduced price)' : '';
		let startDate = new Intl.DateTimeFormat('en-GB', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		}).format(calculateStartDate(membership.id));
		let endDate = new Intl.DateTimeFormat('en-GB', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		}).format(calculateExpiryDate(membership.id));
		let asterisk = membership.reduced ? '<sup>*</sup>' : '';
		return `${membership.name} ${reduced} - ${startDate} - ${endDate} ${asterisk}`;
	}
</script>

<h1>Become a member!</h1>
<Terms />

<form method="POST">
	<h2>Membership form</h2>
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

		{#each memberships as membership}
			<label
				><input
					name="membershipType"
					bind:group={selectedMembership}
					type="radio"
					value={membership.id}
					required
				/>
				{@html formatMembershipName(membership)}
			</label>
		{/each}

		<p>
			<sup>*</sup> Reduced price is only available for students, children, pensioners and unemployed
			persons.
		</p>
	</fieldset>

	<div class="line" />
	<p class="total">Price: NOK {memberships.find((m) => m.id === selectedMembership)?.price}</p>
	<div class="buttons">
		<button class="vipps_button" formaction="?/payWithVipps"
			><img alt="" src="/vipps_english.svg" />
		</button><span> or </span>
		<button class="card_button" formaction="?/payWithCard"
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

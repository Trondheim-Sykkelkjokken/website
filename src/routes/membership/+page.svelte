<script>
	// @ts-ignore, as there is no type definition for svelte-icons-pack
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import AiOutlineCreditCard from 'svelte-icons-pack/ai/AiOutlineCreditCard';
	import Terms from './terms.svelte';
	import memberships_data from '../../config/memberships.json';
	import { calculateStartDate, calculateExpiryDate } from '$lib/utils/memberships';
	import { t, locale } from '$lib/translations';
	let memberships = memberships_data.memberships;
	let selectedMembership = 'full-regular';

	let currentLocale = locale.get();
	locale.subscribe((value) => {
		currentLocale = value;
	});
</script>

<h1>{@html $t('membership.heading')}</h1>
<Terms />

<form method="POST">
	<h2>{@html $t('membership.signup')}</h2>

	<label>
		{@html $t('membership.name_field')}<br />
		<input required name="name" type="text" style="width: 100%; max-width: 300px;" />
	</label>

	<label>
		{@html $t('membership.email_field')}<br />
		<input required name="email" type="email" style="width: 100%; max-width: 300px;" />
	</label>

	<fieldset>
		<legend>{@html $t('membership.membership_type')}</legend>

		<ul>
			<li>{@html $t('membership.type1')}</li>
			<li>{@html $t('membership.type2')}</li>
		</ul>

		<p>{@html $t('membership.reduced_price')}</p>

		{#each memberships as membership}
			<label
				><input
					name="membershipType"
					bind:group={selectedMembership}
					type="radio"
					value={membership.id}
					required
				/>
				{currentLocale === 'no' ? membership.norwegian_name : membership.name}{membership.reduced
					? ' (reduced)'
					: ''}: {membership.price} kr
			</label>
		{/each}
	</fieldset>

	<p class="total">
		{@html $t('membership.price')}
		{memberships.find((m) => m.id === selectedMembership)?.price} kr
	</p>
	<div class="buttons">
		<button class="vipps_button" formaction="?/payWithVipps" aria-label="Pay with Vipps"
			><img alt="" src="/vipps_{currentLocale}.svg" />
		</button><span> {@html $t('membership.or')} </span>
		<button class="card_button" formaction="?/payWithCard" aria-label="Pay with card"
			>{@html $t('membership.card')}&nbsp<Icon src={AiOutlineCreditCard} color="white" /></button
		>
	</div>
</form>

<style>
	label {
		display: block;
		margin: 0.5rem 0;
	}

	.total {
		font-size: 2rem;
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
		font-size: 1rem;
		background-color: rgb(58, 183, 19);
		border: none;
		color: white;
		padding: 10px 20px;
		text-align: center;
		text-decoration: none;
		border-radius: 5px;
		height: 44px;
		margin-left: 0.5rem;
		font-weight: 500;
	}
</style>

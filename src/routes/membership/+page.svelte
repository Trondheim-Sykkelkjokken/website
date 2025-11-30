<script>
	// @ts-ignore, as there is no type definition for svelte-icons-pack
	import { locale, t } from '$lib/translations';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import AiOutlineCreditCard from 'svelte-icons-pack/ai/AiOutlineCreditCard';
	import memberships_data from '../../config/memberships.json';
	import Terms from './terms.svelte';
	let memberships = memberships_data.memberships;
	let selectedMembership = 'full-regular';

	let currentLocale = locale.get();
	locale.subscribe((value) => {
		currentLocale = value;
	});
</script>

<h1>{@html $t('membership.heading')}</h1>

<p>{@html $t('membership.intro')}</p>

<form method="POST">
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
				{currentLocale === 'nb' || currentLocale === 'nn'
					? membership.norwegian_name
					: membership.name}
				{membership.reduced
					? ` (${currentLocale === 'nb' || currentLocale === 'nn' ? 'redusert' : 'reduced'})`
					: ''}: {membership.price} kr
			</label>
		{/each}
	</fieldset>

	<p class="total">
		{@html $t('membership.price')}
		{memberships.find((m) => m.id === selectedMembership)?.price} kr
	</p>
	<div class="buttons">
		<button class="payment-button vipps" formaction="?/payWithVipps" aria-label="Pay with Vipps">
			<span>{@html $t('membership.pay_with')}</span>
			<img src="/vipps_logo.svg" alt="Vipps" />
		</button>
		<button class="payment-button card" formaction="?/payWithCard" aria-label="Pay with card">
			<span>{@html $t('membership.pay_with')} {@html $t('membership.card')}</span>
			<Icon src={AiOutlineCreditCard} color="white" size="20" />
		</button>
	</div>
</form>

<Terms />

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

	form {
		margin-bottom: 1rem;
	}

	.buttons {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	fieldset {
		margin-top: 3rem;
	}

	.payment-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		height: 44px;
		min-width: 200px;
		padding: 0 20px;
		font-size: 16px;
		font-weight: 600;
		color: white;
		border: none;
		border-radius: 5px;
		white-space: nowrap;
	}

	.payment-button.vipps {
		background-color: #ff5b24;
	}

	.payment-button.card {
		background-color: #3ab713;
	}

	.payment-button img {
		height: 16px;
		width: auto;
		margin-top: 3px;
	}
</style>


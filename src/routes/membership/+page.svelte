<script>
	// @ts-ignore, as there is no type definition for svelte-icons-pack
	import { locale, t } from '$lib/translations';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import AiOutlineCreditCard from 'svelte-icons-pack/ai/AiOutlineCreditCard';
	import memberships_data from '../../config/memberships.json';
	import { calculateExpiryDate } from '$lib/utils/memberships';
	import Terms from './terms.svelte';

	const memberships = memberships_data.memberships;
	const yearExpiry = calculateExpiryDate('full');
	const semesterExpiry = calculateExpiryDate('semester');

	/** @type {Intl.DateTimeFormatOptions} */
	const dateFormat = { day: 'numeric', month: 'long' };

	/** Default selection */
	let duration = 'semester';
	let reduced = false;

	/** @param {string} dur @param {boolean} isReduced */
	const priceFor = (dur, isReduced) =>
		memberships.find((m) => m.id === `${dur}-${isReduced ? 'reduced' : 'regular'}`)?.price;

	$: dateLocale = $locale === 'en' ? 'en-GB' : 'nb-NO';
	$: semesterDate = semesterExpiry.toLocaleDateString(dateLocale, dateFormat);
	$: fullDate = yearExpiry.toLocaleDateString(dateLocale, dateFormat);
	// @ts-ignore - sveltekit-i18n payload types are stricter than runtime
	$: semesterLabel = $t('membership.semester_option', { date: semesterDate, price: priceFor('semester', reduced) });
	// @ts-ignore
	$: fullLabel = $t('membership.full_year_option', { date: fullDate, price: priceFor('full', reduced) });
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

	<label class="reduced-check">
		<input type="checkbox" bind:checked={reduced} />
		{$t('membership.half_price')}
	</label>

	<div class="duration" role="radiogroup" aria-label={$t('membership.duration_legend')}>
		<label>
			<input type="radio" bind:group={duration} value="semester" />
			{semesterLabel}
		</label>

		<label>
			<input type="radio" bind:group={duration} value="full" />
			{fullLabel}
		</label>
	</div>

	<!-- The server expects the original four-id format, so reconstruct it from the form state. -->
	<input
		type="hidden"
		name="membershipType"
		value={`${duration}-${reduced ? 'reduced' : 'regular'}`}
	/>

	<p class="total">
		{@html $t('membership.price')}
		{priceFor(duration, reduced)} kr
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

	.reduced-check {
		margin-top: 2rem;
	}

	.duration {
		margin-top: 1.5rem;
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

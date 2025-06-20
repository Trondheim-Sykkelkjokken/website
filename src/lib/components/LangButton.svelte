<script lang="ts">
	import { t, locale, locales } from '$lib/translations';
	import { invalidateAll } from '$app/navigation';

	const handleChange = (event: Event) => {
		const currentTarget = event.currentTarget as HTMLSelectElement;
		const { value } = currentTarget;

		// Update the locale store
		locale.set(value);

		// Update the cookie for persistence
		document.cookie = `lang=${value}; path=/; max-age=31536000`;
	};
</script>

<div class="language-selector">
	<span class="globe-icon">🌐</span>
	<select class="i18n-dropdown" bind:value={$locale} on:change={handleChange}>
		{#each $locales as value}
			<option {value}>{$t(`lang.${value}`)}</option>
		{/each}
	</select>
</div>

<style>
	.language-selector {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.25rem 0.5rem;
		width: 3rem;
	}

	.globe-icon {
		font-size: 1.2rem;
		margin-right: -0.5rem;
	}

	.i18n-dropdown {
		appearance: none;
		border: none;
		background: transparent;
		font-size: 1rem;
		cursor: pointer;
	}

	.i18n-dropdown:focus {
		outline: none;
	}

	@media (max-width: 720px) {
		.language-selector {
			order: -1; /* Move the language selector to the left */
		}
	}
</style>

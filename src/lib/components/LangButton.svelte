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
	<label for="language-select" class="sr-only">Select language</label>
	<select
		id="language-select"
		class="i18n-dropdown"
		bind:value={$locale}
		on:change={handleChange}
		aria-label="Language selector"
	>
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
		text-align-last: right;
	}

	.i18n-dropdown {
		appearance: none;
		border: none;
		background: transparent;
		font-size: 1.25rem;
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

	.i18n-dropdown:focus {
		outline: 2px solid #0078d4; /* High-contrast focus outline */
		outline-offset: 2px;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>

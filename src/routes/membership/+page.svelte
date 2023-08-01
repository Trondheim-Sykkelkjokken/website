<script>
	/** @type {import('./$types').ActionData} */
	export let form;
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
				><input name="membershipType" type="radio" value="year" required />Full-year membership (1st
				July 2023 - 30th June 2024)
			</label>
			<label
				><input name="membershipType" type="radio" value="semester" />Semester membership (1st July
				2023 - 31th December 2023)
			</label>
			<label>
				<input type="checkbox" name="reducedPrice" />
				Reduced price for students, children, pensioners and unemployed.</label
			>
		</fieldset>

		<input type="submit" value="Submit" />
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
</style>

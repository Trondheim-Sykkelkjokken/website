<script>
	import AiOutlineCreditCard from 'svelte-icons-pack/ai/AiOutlineCreditCard';
	import { t } from '$lib/translations';
</script>

<div class="tandc">
	<details>
		<summary><h2>{@html $t("membership.terms_call_to_action")}</h2></summary>
		<h3>{@html $t("membership.parties")}</h3>
		<p>
			{@html $t("membership.parties_text")}
		</p>
		<h3>{@html $t("membership.payment")}</h3>
		<p>
			{@html $t("membership.payment_text")}
		</p>

		<h3>{@html $t("membership.delivery")}</h3>
		<p>{@html $t("membership.delivery_text")}</p>

		<h3>{@html $t("membership.withdrawal")}</h3>
		<p>
			{@html $t("membership.withdrawal_text")}
		</p>

		<h3>{@html $t("membership.returns")}</h3>
		<p>{@html $t("membership.returns_text")}</p>

		<h3>{@html $t("membership.complaint")}</h3>
		<p>
			{@html $t("membership.complaint_text")}
		</p>

		<h3>{@html $t("membership.conflict")}</h3>
		<p>
			{@html $t("membership.conflict_text")}
		</p>

		<h3>{@html $t("membership.membership")}</h3>
		<p>{@html $t("membership.membership_text")}</p>

		<h3>{@html $t("membership.acceptance")}</h3>
		<p>
			{@html $t("membership.acceptance_text")}
		</p>
		<ul>
			<li>{@html $t("membership.acceptance_bullet_1")}</li>
			<li>{@html $t("membership.acceptance_bullet_2")}</li>
			<li>{@html $t("membership.acceptance_bullet_3")}</li>
			<li>{@html $t("membership.acceptance_bullet_4")}</li>
		</ul>
		<p>{@html $t("membership.participation")}</p>
		<p>
			{@html $t("membership.warning")}
		</p>
	</details>
</div>

<style>
	.tandc {
		background-color: whitesmoke;
		color: black;
		font-family: monospace;
		padding: 1rem;
	}

	h2 {
		display: inline;
	}
	summary {
		cursor: pointer;
	}
</style>

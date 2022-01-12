<script context="module" lang="ts">
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import AiOutlineMail from 'svelte-icons-pack/ai/AiOutlineMail';
	import AiOutlineFacebook from 'svelte-icons-pack/ai/AiOutlineFacebook';
	import AiOutlineInstagram from 'svelte-icons-pack/ai/AiOutlineInstagram';
	import AiOutlineGithub from 'svelte-icons-pack/ai/AiOutlineGithub';

	const iconProps = { size: '35px', color: 'whitesmoke' };
</script>

<footer>
	<div id="footer-banner">
		<div class="flex-container">
			<div class="footer-item">
				<a href="https://g.page/stammencafe?share"
					>Stammen Café og Bar, <br /> Kongens gate 55, <br /> Trondheim, Norway</a
				>
			</div>
			<div class="footer-item">SLOGAN?</div>
			<div class="footer-item">
				<div class="icons">
					<a href="mailto:trondheimsykkelkjokken@gmail.com"
						><Icon {...iconProps} src={AiOutlineMail} /></a
					>
					<a href="https://www.facebook.com/trondheimsykkelkjokken"
						><Icon {...iconProps} src={AiOutlineFacebook} /></a
					>
				</div>
				<div class="icons">
					<a href="https://www.instagram.com/trondheimsykkelkjokken/"
						><Icon {...iconProps} src={AiOutlineInstagram} /></a
					>
					<a href="https://github.com/Trondheim-Sykkelkjokken"
						><Icon {...iconProps} src={AiOutlineGithub} /></a
					>
				</div>
			</div>
		</div>
	</div>
</footer>

<style>
	a {
		color: whitesmoke;
		text-decoration: none;
	}

	footer {
		padding-top: 1rem;
		background-color: #efeb92;
		min-height: 6rem;
	}

	#footer-banner {
		background-color: #efa170;
		width: calc(100% - 2rem);
		padding: 1rem 1rem;
	}

	.flex-container {
		max-width: 1000px;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.footer-item {
		color: whitesmoke;
		align-self: center;
		flex-shrink: 1;
		width: 33.3%;
	}

	.footer-item:nth-child(2) {
		text-align: center;
	}

	.footer-item:last-child {
		flex-shrink: 2;
		text-align: right;
	}

	.icons {
		display: inline-block;
	}

	@media (max-width: 720px) {
		footer {
			font-size: 0.9rem;
		}

		.icons {
			display: block;
		}
	}
</style>

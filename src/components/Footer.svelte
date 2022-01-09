<script context="module">
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import AiOutlineMail from 'svelte-icons-pack/ai/AiOutlineMail';
	import AiOutlineFacebook from 'svelte-icons-pack/ai/AiOutlineFacebook';
	import AiOutlineInstagram from 'svelte-icons-pack/ai/AiOutlineInstagram';
	import AiOutlineGithub from 'svelte-icons-pack/ai/AiOutlineGithub';

	const iconProps = { size: '2.5rem', color: 'whitesmoke' };
</script>

<footer>
	<div id="footer-banner">
		<div class="flex-container">
			<div class="footer-item">
				<a href="https://g.page/stammencafe?share"
					>Stammen Café og Bar, <br /> Kongens gate 55, <br /> Trondheim, Norway</a
				>
			</div>
			<div class="footer-item">Trondheim Sykkelkjøkken</div>
			<div class="footer-item">
				<a href="mailto:trondheimsykkelkjokken@gmail.com"
					><Icon {...iconProps} src={AiOutlineMail} /></a
				>
				<a href="https://www.facebook.com/trondheimsykkelkjokken"
					><Icon {...iconProps} src={AiOutlineFacebook} /></a
				>
				<a href="https://www.instagram.com/trondheimsykkelkjokken/"
					><Icon {...iconProps} src={AiOutlineInstagram} /></a
				>
				<a href="https://github.com/Trondheim-Sykkelkjokken"
					><Icon {...iconProps} src={AiOutlineGithub} /></a
				>
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
		width: 100%;
		padding: 1rem 0;
	}

	.flex-container {
		max-width: 1000px;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
	}

	.footer-item {
		flex-grow: 1;
		color: whitesmoke;
		align-self: center;
	}

	.footer-item:nth-child(2) {
		text-align: center;
	}

	.footer-item:last-child {
		text-align: right;
	}
</style>

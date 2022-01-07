<footer>
	<div id="footer-banner">
		<div class="flex-container">
			<div class="footer-item">Stammen kafe og bar</div>
			<div class="footer-item">Trondheim Sykkelkjøkken</div>
			<div class="footer-item">Social media links here</div>
		</div>
	</div>
</footer>

<style>
	footer {
		padding-top: 1rem;
		background-color: #efeb92;
		min-height: 3rem;
	}

	#footer-banner {
		background-color: #efa170;
		width: 100%;
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
	}

	.footer-item:nth-child(2) {
		text-align: center;
	}

	.footer-item:last-child {
		text-align: right;
	}
</style>

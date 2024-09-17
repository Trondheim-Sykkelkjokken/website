<div class="container">
	<img alt="LOADING" src="/wheel.png" class="spinner" />
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 33vh; /* Adjust as needed */
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.spinner {
		animation: spin 1s ease-in-out infinite;
		transform-origin: calc(50% + 2px) calc(50% + 2px);
	}
</style>

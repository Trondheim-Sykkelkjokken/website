<div class="container">
	<img alt="LOADING" src="/wheel.png" class="spinner" />
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 33vh;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	/* Don't show spinner for fast-ish pageloads by hiding it until one full
	animation is finished (0.5s, below) */
	@keyframes showSpinner {
		0% {
			opacity: 0;
		}
		99% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	.spinner {
		animation:
			showSpinner 0.5s forwards,
			spin 1s ease-in-out infinite;
	}
</style>

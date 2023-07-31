<script>
	let frame;
	let frame_counter = 0;

	let frame_heights = {
		1: '260vh',
		2: '75vh',
		3: '75vh',
		4: '125vh',
		5: '60vh'
	};

	const resize = () => {
		frame_counter += 1;
		let frame_height = frame_heights[frame_counter];
		if (frame_height) {
			frame.style.height = frame_heights[frame_counter];
		}
	};
</script>

<h1>Become a member!</h1>

<style>
	#frame {
		width: 100%;
	}
</style>

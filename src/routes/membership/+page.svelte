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

<iframe
	bind:this={frame}
	on:load={resize}
	id="frame"
	title="Membership form"
	src="https://docs.google.com/forms/d/e/1FAIpQLSfMpyJCKUkfD2hfunoOwGSJUcvM29RowHGlPGynwzdE3DaUMw/viewform?embedded=true"
	frameborder="0"
	marginheight="0"
	marginwidth="0">Loading…</iframe
>

<style>
	#frame {
		width: 100%;
	}
</style>

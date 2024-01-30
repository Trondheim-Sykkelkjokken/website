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

<p>By becoming a member, you get access to the bike kitchen, all our tools, and to the community. We all help each other out, and share the knowledge we have. If you need help figuring out how to fix something, we're there for you. If you just need tools, the tools are also there for you.</p>

<p>You can get a membership for a full school year, or for one semester. We also have a reduced price for students, unemployed, retirees, and children.</p>

<p>To sign up, use this form:</p>

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

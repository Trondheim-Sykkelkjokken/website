<div class="flex-container">
	<section>
		<h1>Trondheim Bike Kitchen</h1>
		<p>
			Candy canes tiramisu cake lollipop pudding icing jujubes. Gummi bears jujubes ice cream
			chocolate bar gummi bears danish chocolate bar cake. Fruitcake candy canes toffee muffin jelly
			beans. Tootsie roll ice cream marzipan cotton candy powder danish pudding cupcake.
		</p>
	</section>
	<div class="banner" />
	<section class="right">
		<h1>Membership</h1>
		<p>
			Candy sesame snaps bear claw cookie. Tart marzipan dessert gummies. Marzipan dragée wafer
			croissant cake. Biscuit muffin carrot cake.
		</p>
	</section>
	<div class="banner" />
	<section>
		<h1>Membership</h1>
		<p>
			Candy sesame snaps bear claw cookie. Tart marzipan dessert gummies. Marzipan dragée wafer
			croissant cake. Biscuit muffin carrot cake.
		</p>
	</section>
	<div class="banner" />
	<section class="right">
		<h1>Membership</h1>
		<p>
			Candy sesame snaps bear claw cookie. Tart marzipan dessert gummies. Marzipan dragée wafer
			croissant cake. Biscuit muffin carrot cake.
		</p>
	</section>
	<div class="banner" />
	<div class="banner" />
	<div class="banner" />
</div>

<style>
	.flex-container {
		display: flex;
		flex-direction: column;
	}

	section {
		width: 50%;
		margin: 2.5rem 0;
	}

	.right {
		align-self: end;
	}

	.banner {
		width: 100%;
		height: 37.5vmin;
		min-height: 15em;
		background: linear-gradient(#000, transparent, #000), var(--img) 50%;
		background-size: cover;
		background-repeat: no-repeat;
		background-attachment: fixed;
		background-blend-mode: multiply;
	}
	.banner:nth-of-type(1) {
		--img: url(/images/1.JPG);
	}
	.banner:nth-of-type(2) {
		--img: url(/images/2.JPG);
	}
	.banner:nth-of-type(3) {
		--img: url(/images/3.JPG);
	}
	.banner:nth-of-type(4) {
		--img: url(/images/4.JPG);
	}
	.banner:nth-of-type(5) {
		--img: url(/images/5.JPG);
	}
	.banner:nth-of-type(6) {
		--img: url(/images/6.JPG);
	}
</style>

<script>
	import img2 from '$lib/assets/2.jpg?w=900&format=webp&srcset&imagetools';
	import img3 from '$lib/assets/3.jpg?w=900&format=webp&srcset&imagetools';
	import img4 from '$lib/assets/4.jpg?w=900&format=webp&srcset&imagetools';
	import img6 from '$lib/assets/6.jpg?w=900&format=webp&srcset&imagetools';
</script>

<div class="flex-container">
	<section>
		<h1>Trondheim Bike Kitchen</h1>
		<p>
			Trondheim Bike Kitchen is a non-profit bike workshop. Here members get access to tools and
			guidance in how to repair their own bikes. "Bike kitchen" is an established concept for
			sharing knowledge and resources on bike repair and similar initiatives exist in countries all
			over the world. Our goal is to be a community for sharing knowledge about repairing and
			inspiration for cycling. We also wish to contribute to reduce resource consumption by giving
			bikes a longer life through repairs and good maintenance.
		</p>
	</section>
	<img srcset={img6} type="image/webp" alt="" class="banner" />
	<section class="right">
		<h1>What we do</h1>
		<p>
			At the bike kitchen you can learn more about repairing bikes and meet other people who are
			interested in cycling, repairing and green mobility. Our workshop is open on Wednesdays from
			17-20h, and occasionally we also host other bike related events.
		</p>
	</section>
	<img srcset={img2} type="image/webp" alt="" class="banner" />
	<section>
		<h1>Membership</h1>
		<p>
			You can buy a membership either for one semester of for the whole school year, and there are
			two price categories:
		</p>
		<ul>
			<li>Ordinary price: 320 NOK per year, or 215 NOK per semester</li>
			<li>
				Reduced price (students, unemployed, pensioners, children): 215 NOK per year, or 145 NOK per
				semester
			</li>
		</ul>
		<a href="/membership"> Buy your membership here! </a>
	</section>
	<img srcset={img4} type="image/webp" alt="" class="banner" />

	<section class="right">
		<h1>Tools</h1>
		<p>
			Bike tools can be expensive, and often you'll only need them once. By becoming a member, for
			the price of a tool, you get access to all our tools, and our knowledgable members. Our
			workshop located at Bøker & Bylab is well stocked with most tools needed for both maintenance
			and repair, as well as consumeables susch as inner tubes, brake pads, grease and cleaning
			supplies.
		</p>
	</section>
	<img srcset={img3} type="image/webp" alt="" class="banner" />
</div>

<style>
	.flex-container {
		display: flex;
		flex-direction: column;
	}

	section {
		width: 75%;
		margin: 2.5rem 0;
	}

	@media (max-width: 720px) {
		section {
			width: 100%;
		}
	}

	.banner {
		width: 100%;
		max-height: 20rem;
		object-fit: cover;
	}
</style>

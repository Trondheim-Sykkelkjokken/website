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
			Trondheim Bike Kitchen is a membership-based community bicycle workshop run by a group of
			volunteers. We help each other learn how to repair our own bicycles, and we provide access to
			a wide range of tools. Everyone is welcome to become a member or a volunteer, regardless of
			bicycle repair skill. Our goal is to make cycling available to all of Trondheim, to spread
			cycling knowledge and joy, and to encourage enivironmentally friendly transport.
		</p>
	</section>
	<img srcset={img6} alt="" class="banner" />
	<section class="right">
		<h1>What we do</h1>
		<p>
			At the bike kitchen you can learn more about repairing bikes and meet other people who are
			interested in cycling, repairing and green mobility. Our workshop is open on Wednesdays from
			17-20h, and occasionally we also host other bike related events.
		</p>
	</section>
	<img srcset={img2} alt="" class="banner" />
	<section>
		<h1>Membership</h1>
		<p>
			You can buy a membership either for one semester of for the whole school year, and there are
			two price categories:
		</p>
		<ul>
			<li>Ordinary price: 330 NOK per year, or 220 NOK per semester</li>
			<li>
				Reduced price (students, unemployed, pensioners, children): 215 NOK per year, or 150 NOK per
				semester
			</li>
		</ul>
		<a href="/membership"> Become a member today! </a>
	</section>
	<img srcset={img4} alt="" class="banner" />

	<section class="right">
		<h1>Tools</h1>
		<p>
			Bike tools can be expensive, and often you'll only need them once. By becoming a member, for
			the price of a tool, you get access to all our tools, and our knowledgable members. Our
			workshop located at Bøker & Bylab is well stocked with most tools needed for both maintenance
			and repair, as well as consumeables such as inner tubes, brake pads, grease and cleaning
			supplies.
		</p>
	</section>
	<img srcset={img3} alt="" class="banner" />
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

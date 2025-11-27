<script>
	import { preloadData } from '$app/navigation';
	import img2 from '$lib/assets/2.jpg?w=900&format=webp&srcset&imagetools';
	import img3 from '$lib/assets/3.jpg?w=900&format=webp&srcset&imagetools';
	import img4 from '$lib/assets/4.jpg?w=900&format=webp&srcset&imagetools';
	import img6 from '$lib/assets/6.jpg?w=900&format=webp&srcset&imagetools';
	import { t, locale } from '$lib/translations';
</script>

<div class="flex-container">
	<section>
		<h1>{@html $t('home.title1')}</h1>
		<p>{@html $t('home.text1')}</p>
	</section>
	<img srcset={img6} alt="" class="banner" />
	<section class="right">
		<h1>{@html $t('home.title2')}</h1>
		<p>{@html $t('home.text2')}</p>
	</section>
	<img srcset={img2} alt="" class="banner" />
	<section class="right">
		<h1>{@html $t('home.title3')}</h1>
		<p>{@html $t('home.text3')}</p>
	</section>
	<img srcset={img3} alt="" class="banner" />
</div>

<style>
	.flex-container {
		display: flex;
		flex-direction: column;
	}

	.banner {
		width: 100%;
		max-height: 20rem;
		object-fit: cover;
	}
</style>

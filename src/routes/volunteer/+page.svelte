<script>
	import img4 from '$lib/assets/4.jpg?w=900&format=webp&srcset&imagetools';
	import { t } from '$lib/translations';
</script>

<h1>{@html $t('volunteer.heading')}</h1>

<p>{@html $t('volunteer.paragraph1')}</p>

<p>{@html $t('volunteer.paragraph2')}</p>

<ul>
	<li>{@html $t('volunteer.li1')}</li>
	<li>{@html $t('volunteer.li2')}</li>
	<li>{@html $t('volunteer.li3')}</li>
	<li>{@html $t('volunteer.li4')}</li>
	<li>{@html $t('volunteer.li5')}</li>
</ul>
<p>{@html $t('volunteer.paragraph3')}</p>

<img srcset={img4} alt="" />

<style>
	img {
		padding-top: 1rem;
	}
</style>

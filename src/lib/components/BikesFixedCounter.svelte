<script lang="ts">
  import data from '$lib/data/stats.json';
  import { t, locale } from '$lib/translations';
  const count: number = Number.isFinite(data?.bikes_fixed) ? data.bikes_fixed : 0;
</script>

<div class="stat-badge" role="status" aria-live="polite">
  <div class="value">{count}</div>
  <div class="label">{@html $t('counter.bikesFixed')}</div>
</div>

<style>
  .stat-badge {
    display: inline-block;
    padding: 0.4rem 0.6rem;
    background: #f2e79a;
    border: 2px solid rgba(0,0,0,0.12);
    border-radius: 0.9rem;
    box-shadow: 0 6px 16px rgba(0,0,0,0.15);
    transform: rotate(-4deg);
    position: relative;
    z-index: 0;
  }
  .value { font-weight: 600; font-size: 1.8rem; line-height: 1; }
  .label { font-size: 0.85rem; margin-top: 0.1rem; }

</style>

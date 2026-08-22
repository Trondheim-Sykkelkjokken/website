import eventsConfig from '../../config/events.json';
import { getUpcomingEvents, type EventsConfig } from '$lib/utils/events';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const today = new Date().toISOString().slice(0, 10);
	const events = getUpcomingEvents(eventsConfig as EventsConfig, today, 6);

	return { events };
};

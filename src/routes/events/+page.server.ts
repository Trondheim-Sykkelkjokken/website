export const prerender = false;

import { EVENTBRITE_API_KEY } from '$env/static/private';
import type { EventBriteResponse } from '$lib/types/events.type';
import fixtureEvents from '$lib/fixtures/test-events.json';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
    const response = await fetch('https://www.eventbriteapi.com/v3/organizations/486298958703/events', {
        headers: {
            'Authorization': `Bearer ${EVENTBRITE_API_KEY}`,
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        }
    });
    const data = await response.json();

    console.log(data)

    if (process.env.NODE_ENV === 'development') {
        data.events.push(...fixtureEvents as Event[]);
    }

    return {
        events: data.events
    };
};
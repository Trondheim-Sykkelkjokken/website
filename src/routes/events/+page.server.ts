export const prerender = false;

import { EVENTBRITE_API_KEY } from '$env/static/private';
import fixtureEvents from '$lib/fixtures/test-events.json';
import type { BikeKitchenEvent, EventBriteResponse } from '$lib/types/events.type';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
    const response = await fetch('https://www.eventbriteapi.com/v3/organizations/486298958703/events', {
        headers: {
            'Authorization': `Bearer ${EVENTBRITE_API_KEY}`,
            'Content-Type': 'application/json'
        }
    });
    const data: EventBriteResponse = await response.json();

    if (process.env.NODE_ENV === 'development') {
        data.events.push(...fixtureEvents as unknown as BikeKitchenEvent[]);
    }

    return {
        events: data.events
    };
};
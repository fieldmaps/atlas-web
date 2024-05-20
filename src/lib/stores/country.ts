import type { Map } from 'maplibre-gl';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export const map: Writable<Map> = writable();

export const settlements = writable([]);
export const search = writable('');

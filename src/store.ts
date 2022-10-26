import type { Map } from 'maplibre-gl';
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const map: Writable<Map> = writable();
export const adm = writable({});
export const lvl = writable(0);

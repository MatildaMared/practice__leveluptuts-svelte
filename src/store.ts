import { writable } from "svelte/store";

export const score = writable(0);
console.log(score);

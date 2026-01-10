import * as auth from "./auth"

export const gs = { auth }

// @ts-expect-error: no globalThis signature
globalThis.gs = gs

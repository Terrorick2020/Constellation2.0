export const WS_CONNECTION     = import.meta.env.VITE_WS_CONNECTION ?? 'reverb'
export const REVERB_HOST       = import.meta.env.VITE_REVERB_HOST
export const REVERB_APP_ID     = import.meta.env.VITE_REVERB_APP_ID
export const REVERB_APP_KEY    = import.meta.env.VITE_REVERB_APP_KEY
export const REVERB_APP_SECRET = import.meta.env.VITE_REVERB_APP_SECRET

// if (
//     !REVERB_HOST       ||
//     !REVERB_APP_ID     ||
//     !REVERB_APP_KEY    ||
//     !REVERB_APP_SECRET
// ) {
//     throw new Error( 'Reverb environment variable values are missing!' )
// }

const PATTERN_TIME = /^(\d\d):?(\d\d)$/

export const MILLISECONDS = 1
export const SECONDS      = 1000 * MILLISECONDS
export const MINUTES      = 60 * SECONDS
export const HOURS        = 60 * MINUTES

export const SUNDAY       = 'Sunday'
export const MONDAY       = 'Monday'
export const TUESDAY      = 'Tuesday'
export const WEDNESDAY    = 'Wednesday'
export const THURSDAY     = 'Thursday'
export const FRIDAY       = 'Friday'
export const SATURDAY     = 'Saturday'

export const DAYS = Object.freeze([
    SUNDAY,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
])


export function aggregate(tuples) {
    return tuples.reduce((sum, tuple) => sum + diff(tuple), 0.0)
}


export function diff([start, stop]) {
    const stopMs = parse(stop)
    const startMs = parse(start)
    return startMs === null || stopMs === null
        ? 0.0
        : round((stopMs - startMs) / HOURS)
}


export function formatDuration(ms) {
    let value = parseInt(ms, 10)

    // Round to nearest second
    value = Math.round(value / 1000) * 1000

    const minutes = Math.floor(value / MINUTES)
    value -= minutes * MINUTES

    const seconds = Math.floor(value / SECONDS)

    return `${minutes}:${seconds.toString().padStart(2, 0)}`
}


//
// Internals
//

function parse(value) {
    // Extract
    const match = PATTERN_TIME.exec((value || '').trim())
    if (!match) {
        return null
    }

    // Validate
    const hours = parseInt(match[1], 10)
    if (hours < 0 || hours > 23) {
        console.warn('hours must be a number between 0 and 23')
        return null
    }
    const minutes = parseInt(match[2], 10)
    if (minutes < 0 || minutes > 59) {
        console.warn('minutes must be a number between 0 and 59')
        return null
    }

    // Convert to milliseconds past midnight
    return (hours * HOURS) + (minutes * MINUTES)
}


function round(n) {
    return Math.round(n / 0.5) * 0.5
}

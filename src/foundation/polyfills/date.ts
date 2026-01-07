/**
 * Extensions for Number
 *
 * Note: Extending primitive's can be problematic without care. For more info, see
 * https://stackoverflow.com/questions/8859828/javascript-what-dangers-are-in-extending-array-prototype
 *
 * Tips:
 * 1. for...in will break if you naively extend via Date.propotype.foo = ...
 *    Instead, use Object.defineProperty({value: fnc, enumerable: false})
 * 2. Drop support for older Internet Explorer
 */

export {}

declare global {
	interface DateConstructor {
		/**
		 * Calculates the number of days between two dates or date strings
		 */
		daysBetween(date1: Date | string | number, date2: Date | string | number): number

		/**
		 * Creates a Date from a YYYYMMDDHHMM string in current timezone
		 */
		fromStringYYYYMMDDHHMM: (dateStr: string) => Date

		/**
		 * Returns the epoch time adjusted for timezone and daylight savings.
		 * Inspired by https://stackoverflow.com/a/39584529/1202757
		 */
		getUtcTime(date: Date | string | number): number

		monthNamesShort: string[]

		MS_DAY: number

		/**
		 * Returns a deltas in various units and a human-readable string representing the time between two dates
		 */
		timeBetween(
			time1: Date | number,
			time2: Date | number,
		): {
			/** delta in milliseconds */
			ms: number
			/** delta in seconds */
			s: number
			/** delta in minutes */
			m: number
			/** delta in hours */
			h: number
			/** delta in days */
			d: number
			/** pretty value, ie the '6' of '6 days' */
			prettyValue: number
			/** pretty unit, ie the 'days' of '6 days' */
			prettyUnit: string
			/** pretty text, ie '6 days' */
			prettyText: string
			/** pretty text, ie '6d' or '6h' or etc */
			prettyShort: string
		}
	}
	interface Date {
		copy(): Date
		/** A date string that is short and timezone agnostic */
		toStringYYYYMMDDHHMM(): string
	}
}

Object.defineProperties(Date.prototype, {
	copy: {
		value: function () {
			return new Date(this)
		},
		enumerable: false,
	},
	toStringYYYYMMDDHHMM: {
		value: function () {
			return (
				this.getFullYear().toString() +
				(this.getMonth() + 1).toString().padStart(2, "0") +
				this.getDate().toString().padStart(2, "0") +
				this.getHours().toString().padStart(2, "0") +
				this.getMinutes().toString().padStart(2, "0")
			)
		},
		enumerable: false,
	},
})

Date.daysBetween = (date1: Date | string | number, date2: Date | string | number) => {
	const res = Math.floor((Date.getUtcTime(date1) - Date.getUtcTime(date2)) / Date.MS_DAY)
	return res
}

Date.fromStringYYYYMMDDHHMM = (dateStr: string): Date => {
	const year = parseInt(dateStr.slice(0, 4), 10)
	const month = parseInt(dateStr.slice(4, 6), 10) - 1
	const day = parseInt(dateStr.slice(6, 8), 10)
	const hours = parseInt(dateStr.slice(8, 10), 10)
	const minutes = parseInt(dateStr.slice(10, 12), 10)
	return new Date(year, month, day, hours, minutes, 0, 0)
}

Date.getUtcTime = (date: Date | string | number) => {
	const result = new Date(date)
	result.setMinutes(result.getMinutes() - result.getTimezoneOffset())
	return result.getTime()
}

Date.monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

Date.MS_DAY = 86400000

Date.timeBetween = (time1: Date | number, time2: Date | number) => {
	const ms = new Date(time2).getTime() - new Date(time1).getTime() // future minus now
	const s = Math.floor(ms / 1000)
	const m = Math.floor(ms / (60 * 1000))
	const h = Math.floor(ms / (60 * 60 * 1000))
	const d = Math.floor(ms / (24 * 60 * 60 * 1000))

	let prettyValue: number
	let prettyUnit: string
	if (d >= 1) {
		prettyValue = d
		prettyUnit = d === 1 ? "day" : "days"
	} else if (h >= 1) {
		prettyValue = h
		prettyUnit = h === 1 ? "hour" : "hours"
	} else {
		prettyValue = m
		prettyUnit = m === 1 ? "minute" : "minutes"
	}
	const prettyText = `${prettyValue} ${prettyUnit}`
	const prettyShort = `${prettyValue}${prettyUnit.charAt(0)}`
	return { ms, s, m, h, d, prettyValue, prettyUnit, prettyText, prettyShort }
}

import HoursRequired from '/components/HoursRequired.js'
import HoursRemaining from '/components/HoursRemaining.js'
import Week from '/components/Week.js'
import * as time from '/utils/time.js'


const KEY_STATE = 'state'


export default {
    components: {HoursRemaining, HoursRequired, Week},

    template: `
        <div class="Application">
            <h1>tinytracker</h1>

            <Week
                :days="days"
                @changed="onDaysChange"
            />

            <div class="Application__metrics">
                <HoursRequired
                    :hours="requiredHours"
                    @changed="onRequiredHoursChange"
                />
                <HoursRemaining
                    :worked="hoursWorked"
                    :required="requiredHours"
                />
            </div>

            <footer class="Application__controls">
                <button @click="grow" class="Application__button Application__growButton"><span class="icon">+</span></button>
                <button @click="shrink" :class="{'Application__button': true, 'Application__shrinkButton': true, 'Application__button--isDisabled': !canShrink}" :disabled="!canShrink"><span class="icon">&ndash;</span></button>
                <button @click="reset" class="Application__button Application__resetButton">Reset</button>
            </footer>
        </div>
    `,

    computed: {
        canShrink() {
            return this.days.length > 1 && !this.days.some(d => d.times.slice(-1).some(t => t.some(Boolean)))
        },

        hoursWorked() {
            return this.days.reduce((sum, day) => sum + time.aggregate(day.times), 0.0)
        },
    },

    data() {
        return deserialize()
    },

    methods: {
        grow() {
            this.days = this.days.map(d => ({...d, times: [...d.times, []]}))
        },

        onDaysChange(value) {
            this.days = value
        },

        onRequiredHoursChange(value) {
            this.requiredHours = value
        },

        reset() {
            localStorage.clear()

            // ¯\_(ツ)_/¯
            Object.assign(this, deserialize())
        },

        shrink() {
            this.days = this.days.map(d => ({...d, times: d.times.slice(0, -1)}))
        },
    },

    watch: {
        days() {
            serialize(this)
        },

        requiredHours() {
            serialize(this)
        },
    },
}


//
// Helpers
//

function deserialize() {
    const serialized = localStorage.getItem(KEY_STATE)
    if (serialized) {
        console.debug('[Application] deserialize:\n---\n%s\n---', serialized)
        try {
            return JSON.parse(serialized)
        }
        catch (err) {
            console.warn('[Application] deserialize failed:', err)
            localStorage.clear()
        }
    }

    return {
        days: [
            {name: time.MONDAY,    times: [[], [], [], [], []]},
            {name: time.TUESDAY,   times: [[], [], [], [], []]},
            {name: time.WEDNESDAY, times: [[], [], [], [], []]},
            {name: time.THURSDAY,  times: [[], [], [], [], []]},
            {name: time.FRIDAY,    times: [[], [], [], [], []]},
        ],
        requiredHours: 40,
    }
}


function serialize(state) {
    const serialized = JSON.stringify({
        days:          state.days,
        requiredHours: state.requiredHours,
    })
    console.debug('[Application] serialize:', JSON.parse(serialized)/* <-- strips Vue wrappers */)
    localStorage.setItem(KEY_STATE, serialized)
}

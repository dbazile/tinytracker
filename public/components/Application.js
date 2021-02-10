import HoursRemaining from '/components/HoursRemaining.js'
import HoursRequired from '/components/HoursRequired.js'
import Pomodoro from '/components/Pomodoro.js'
import Week from '/components/Week.js'
import * as time from '/utils/time.js'


const DEFAULT_STATE = () => ({
    days: [
        {name: time.MONDAY,    times: [[], [], [], [], []]},
        {name: time.TUESDAY,   times: [[], [], [], [], []]},
        {name: time.WEDNESDAY, times: [[], [], [], [], []]},
        {name: time.THURSDAY,  times: [[], [], [], [], []]},
        {name: time.FRIDAY,    times: [[], [], [], [], []]},
    ],
    pomodoro: {
        alarm: 'Beep',
        startTime: null,
        timers: [],
    },
    requiredHours: 40,
})


export default {
    components: {HoursRemaining, HoursRequired, Pomodoro, Week},

    template: `
        <div class="Application">
            <header class="Application__header">
                <h1>tinytracker</h1>
                <Pomodoro
                    :alarm="pomodoro.alarm"
                    :startTime="pomodoro.startTime"
                    :timers="pomodoro.timers"
                    @alarm-changed="onPomodoroAlarmChange"
                    @timers-changed="onPomodoroTimersChange"
                    @started="onPomodoroStart"
                    @stopped="onPomodoroStop"
                />
            </header>

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
            return this.days.every(d => d.times.length > 1 && !d.times.slice(-1).some(t => t.some(Boolean)))
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

        onPomodoroAlarmChange(alarm) {
            this.pomodoro = {...this.pomodoro, alarm}
        },

        onPomodoroStart(startTime) {
            this.pomodoro = {...this.pomodoro, startTime}
        },

        onPomodoroStop() {
            this.pomodoro = {...this.pomodoro, startTime: null}
        },

        onPomodoroTimersChange(timers) {
            this.pomodoro = {...this.pomodoro, timers}
        },

        onRequiredHoursChange(value) {
            this.requiredHours = value
        },

        reset() {
            localStorage.clear()

            const newState = deserialize()

            // Perist alarms across resets
            newState.pomodoro.alarm = this.pomodoro.alarm

            // ¯\_(ツ)_/¯
            Object.assign(this, newState)
        },

        shrink() {
            this.days = this.days.map(d => ({...d, times: d.times.slice(0, -1)}))
        },
    },

    watch: {
        days() {
            serialize(this)
        },

        pomodoro() {
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
    const defaults = DEFAULT_STATE()
    const serialized = localStorage.getItem('state')
    if (serialized) {
        console.debug('[Application] deserialize:\n---\n%s\n---', serialized)
        try {
            return {...defaults, ...JSON.parse(serialized)}
        }
        catch (err) {
            console.warn('[Application] deserialize failed:', err)
            localStorage.clear()
        }
    }

    return defaults
}


function serialize(state) {
    const serialized = JSON.stringify({
        days:          state.days,
        pomodoro:      state.pomodoro,
        requiredHours: state.requiredHours,
    })
    console.debug('[Application] serialize:', JSON.parse(serialized)/* <-- strips Vue wrappers */)
    localStorage.setItem('state', serialized)
}

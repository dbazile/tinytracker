import * as time from '/utils/time.js'

const DURATION_TASK        = 25 * time.MINUTES
const DURATION_BREAK_SHORT =  5 * time.MINUTES
const DURATION_BREAK_LONG  = 30 * time.MINUTES
const TICK_INTERVAL        =  1 * time.SECONDS

const KEY_STOP_SOUND       = 'm'
const KEY_TOGGLE_START     = 'k'
const KEY_TOGGLE_EXPAND    = 'p'
const SOUND_COMPLETE       = new Audio(`/sounds/${location.search === '?ff' ? 'fanfare/fanfare' : 'four-beeps/four-beeps'}.mp3`)
const SOUND_STARTSTOP      = new Audio('/sounds/click/click.mp3')


export default {
    props: ['startTime', 'timers'],
    emits: ['changed', 'started', 'stopped'],

    template: `
        <div
            :class="{
                'Pomodoro': true,
                'Pomodoro--isEmpty': !timers.length,
                'Pomodoro--isExpanded': isExpanded,
                'Pomodoro--isRunning': this.activeTimer,
            }"
        >
            <div class="Pomodoro__header" @click="toggleExpand">
                <div class="Pomodoro__activeTimer" :title="activeTimer?.text">
                    \u{1F345} {{timers.length
                        ? activeTimer
                            ? activeTimer.text || '(Break)'
                            : 'not running'
                        : 'no tasks'
                    }}
                </div>
                <div class="Pomodoro__clock">{{clock || '--:--'}}</div>
            </div>

            <div class="Pomodoro__track" v-if="timers.length">
                <span
                    v-for="(timer, i) in timers"
                    :title="timer.text"
                    :class="{
                        'Pomodoro__puck': true,
                        'Pomodoro__puck--isActive': i === activeIndex,
                        'Pomodoro__puck--isBreak': !timer.text,
                        'Pomodoro__puck--isComplete': timer.complete,
                    }"
                />
            </div>

            <ul class="Pomodoro__body" v-if="isExpanded">
                <li
                    v-for="(timer, i) in timers"
                    :class="{
                        'Pomodoro__timer': true,
                        'Pomodoro__timer--isActive': i === activeIndex,
                        'Pomodoro__timer--isBreak': !timer.text,
                        'Pomodoro__timer--isComplete': timer.complete,
                    }"
                >
                    <input
                        class="Pomodoro__timerComplete"
                        type="checkbox"
                        :placeholder="'Task ' + (timers.length + 1)"
                        :checked="timer.complete"
                        @change="onTimerCompleteChange(i, $event.target.checked)"
                    />
                    <input
                        class="Pomodoro__timerText"
                        :value="timer.text"
                        @input="onTimerTextChange(i, $event.target.value)"
                    />
                    <input
                        class="Pomodoro__timerMinutes"
                        type="number"
                        min="1"
                        max="30"
                        :value="timer.duration / MINUTES"
                        @input="onTimerDurationChange(i, $event.target.value)"
                    />
                    <div class="Pomodoro__timerRemoveButton" @click="remove(i)" title="Remove">\u2716</div>
                </li>
                <li class="Pomodoro__totalDuration">{{totalDuration}}</li>
            </ul>

            <div class="Pomodoro__footer" v-if="isExpanded">
                <button class="Pomodoro__footerButton Pomodoro__startStopButton" :disabled="!timers.length" @click="toggleStartStop">\u23FB</button>
                <button class="Pomodoro__footerButton Pomodoro__clearButton" :disabled="!timers.length" @click="clear">Clear</button>
                <button class="Pomodoro__footerButton Pomodoro__fillButton" @click="fill">Fill</button>
                <button class="Pomodoro__footerButton Pomodoro__addTimerButton" @click="add(5)">+5</button>
                <button class="Pomodoro__footerButton Pomodoro__addTimerButton" @click="add(25)">+25</button>
                <button class="Pomodoro__footerButton Pomodoro__addTimerButton" @click="add(30)">+30</button>
            </div>
        </div>
    `,

    data() {
        return {
            MINUTES: time.MINUTES,

            activeIndex: null,
            clock:       null,
            isExpanded:  false,
            ticker:      null,
        }
    },

    computed: {
        activeTimer() {
            return this.timers[this.activeIndex]
        },

        totalDuration() {
            return time.formatDuration(this.timers.reduce((sum, t) => t.complete ? sum : sum + t.duration, 0))
        },
    },

    mounted() {
        if (this.startTime) {
            this.start()
        }

        // Listen for shortcut keys
        window.addEventListener('keypress', event => {
            if (event.target.tagName === 'INPUT') {
                return
            }

            switch (event.key) {
                case KEY_STOP_SOUND:
                    this.stopAudio(SOUND_COMPLETE)
                    break
                case KEY_TOGGLE_EXPAND:
                    this.toggleExpand()
                    break
                case KEY_TOGGLE_START:
                    this.toggleStartStop()
                    break
            }
        })
    },

    methods: {
        add(minutes) {
            this.$emit('changed', [...this.timers, {
                duration: minutes * time.MINUTES,
                complete: false,
                text:     '',
            }])
        },

        clear() {
            this.stop()
            this.$emit('changed', [])
        },

        fill() {
            this.$emit('changed', [
                {duration: DURATION_TASK,        complete: false, text: 'Task 1'},
                {duration: DURATION_BREAK_SHORT, complete: false, text: ''},

                {duration: DURATION_TASK,        complete: false, text: 'Task 2'},
                {duration: DURATION_BREAK_SHORT, complete: false, text: ''},

                {duration: DURATION_TASK,        complete: false, text: 'Task 3'},
                {duration: DURATION_BREAK_SHORT, complete: false, text: ''},

                {duration: DURATION_TASK,        complete: false, text: 'Task 4'},
                {duration: DURATION_BREAK_SHORT, complete: false, text: ''},

                {duration: DURATION_BREAK_LONG,  complete: false, text: ''},
            ])
        },

        markComplete(index) {
            this.$emit('changed', this.timers.map((t, i) => i === index ? {...t, complete: true} : t))
        },

        onTimerDurationChange(index, minutes) {
            this.$emit('changed', this.timers.map((t, i) => i === index ? {...t, duration: minutes * time.MINUTES } : t))
        },

        onTimerCompleteChange(index, complete) {
            this.$emit('changed', this.timers.map((t, i) => i === index ? {...t, complete} : t))
        },

        onTimerTextChange(index, text) {
            this.$emit('changed', this.timers.map((t, i) => i === index ? {...t, text} : t))
        },

        playAudio(audio) {
            audio.currentTime = 0
            audio.play()
        },

        remove(index) {
            this.$emit('changed', this.timers.filter((_, i) => i !== index))
        },

        start() {
            const activeIndex = this.timers.findIndex(t => !t.complete)
            if (activeIndex === -1) {
                console.warn('[Pomodoro] nothing to start; bailing')
                return
            }

            if (this.ticker !== null) {
                console.warn('[Pomodoro] already running; bailing')
                return
            }

            console.debug('[Pomodoro] start: interval=%s index=%s', TICK_INTERVAL, activeIndex)

            this.activeIndex = activeIndex
            this.$emit('started', Date.now())
            this.ticker = setInterval(this.tick, TICK_INTERVAL)
            this.tick()

            // Make some noise
            this.playAudio(SOUND_STARTSTOP)
        },

        stop() {
            console.debug('[Pomodoro] stop: interval=%s index=%s', TICK_INTERVAL, this.activeIndex)

            clearInterval(this.ticker)
            this.activeIndex = null
            this.ticker = null
            this.clock = null
            this.$emit('stopped')

            // Make some noise
            this.playAudio(SOUND_STARTSTOP)
        },

        stopAudio(audio) {
            audio.pause()
            audio.currentTime = 0
        },

        tick() {
            const timer = this.timers[this.activeIndex]
            if (!timer) {
                console.warn('[Pomodoro] no timer: index=%s', this.activeIndex)
                this.stop()
                return
            }

            const remainingMs = this.startTime ? (this.startTime + timer.duration) - Date.now() : timer.duration

            // Repaint the clock if timer still active
            if (remainingMs > 0 && !timer.complete) {
                this.clock = time.formatDuration(remainingMs)
                return
            }

            // Deactivate timer
            this.markComplete(this.activeIndex)

            // Make some noise
            this.playAudio(SOUND_COMPLETE)

            // Advance to the next timer if available
            const nextIndex = this.timers.findIndex((t, i) => i !== this.activeIndex && !t.complete)
            if (nextIndex >= 0) {
                this.activeIndex = nextIndex
                this.clock = time.formatDuration(this.timers[nextIndex].duration)
                this.$emit('started', Date.now())
                return
            }

            // No more timers available
            this.stop()
        },

        toggleExpand() {
            this.isExpanded = !this.isExpanded
        },

        toggleStartStop() {
            if (this.activeTimer) {
                this.stop()
            }
            else {
                this.start()
            }
        },
    },

    watch: {
        timers(next, prev) {
            if (!this.startTime) {
                // Not running
                return
            }

            if (next.length != prev.length) {
                const newIndex = this.timers.findIndex(t => !t.complete)
                console.debug('[Pomodoro] reset activeIndex: was=%s new=%s', this.activeIndex, newIndex)
                this.activeIndex = newIndex
            }
        },
    },
}

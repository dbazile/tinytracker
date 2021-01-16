import Duration from '/components/Duration.js'
import * as time from '/utils/time.js'


const TICK_INTERVAL = 60 * time.MINUTES


export default {
    components: {Duration},
    props: ['name', 'times', 'changed'],

    template: `
        <div :class="{'Day': true, 'Day--isToday': isToday}">
            <h2 class="Day__name">{{name}}</h2>
            <div class="Day__hours">{{totalHours}}</div>
            <Duration
                v-for="(tuple, index) in times"
                :index="index"
                :start="tuple[0]"
                :stop="tuple[1]"
                @changed="onDurationChange"
            />
        </div>
    `,

    computed: {
        totalHours() {
            return time.aggregate(this.times).toFixed(1)
        },
    },

    data() {
        return {
            isToday: false,
        }
    },

    mounted() {
        // Update the "is today" marker
        setInterval(this.tick, TICK_INTERVAL)
        window.addEventListener('focus', this.tick)
        window.addEventListener('blur', this.tick)

        // Set initial value
        this.tick()
    },

    methods: {
        onDurationChange(index, tuple) {
            this.$emit('changed', this.name, this.times.map((t, i) => i === index ? tuple : t))
        },

        tick() {
            this.isToday = new Date().getDay() === time.DAYS.indexOf(this.name)
        },
    },
}

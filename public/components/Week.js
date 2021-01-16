import Day from '/components/Day.js'

export default {
    components: {Day},
    props: ['days', 'changed'],

    template: `
        <div class="Week">
            <Day
                v-for="day in days"
                :name="day.name"
                :times="day.times"
                @changed="onDayChanged"
            />
        </div>
    `,

    methods: {
        onDayChanged(name, times) {
            this.$emit('changed', (this.days.map(d => d.name === name ? ({...d, times}) : d)))
        },
    },
}

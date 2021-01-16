import {diff} from '/utils/time.js'


export default {
    props: ['changed', 'index', 'start', 'stop'],

    template: `
        <div class="Duration">
            <input
                ref="start"
                class="Duration__time"
                :value="start"
                maxLength="5"
                placeholder="HH:MM"
                @input="onChange"
            />
            <input
                ref="stop"
                class="Duration__time"
                :value="stop"
                maxLength="5"
                placeholder="HH:MM"
                @input="onChange"
            />
            <span class="Duration__hours">{{hours}}</span>
        </div>
    `,

    computed: {
        hours() {
            return diff([this.start, this.stop]).toFixed(1)
        },
    },

    methods: {
        onChange() {
            this.$emit('changed', this.index, [this.$refs.start.value, this.$refs.stop.value])
        },
    },
}

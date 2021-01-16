export default {
    props: ['hours'],
    emits: ['changed'],

    template: `
        <div :class="{'HoursRequired': true, 'HoursRequired--irregular': hours !== 40}">
            <label>
                <input
                    ref="el"
                    class="HoursRequired__hours"
                    type="number"
                    step="0.5"
                    :value="hours"
                    @input="onChange"
                />
                <span>hours required this week</span>
            </label>
        </div>
    `,

    methods: {
        onChange(e) {
            const raw = e.target.value

            const parsed = parseFloat(raw)
            if (isNaN(parsed)) {
                return
            }

            if (this.hours === parsed) {
                return
            }

            this.$emit('changed', parsed)
        }
    },
}

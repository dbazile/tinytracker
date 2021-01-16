export default {
    props: ['required', 'worked'],

    template: `
        <div :class="{'HoursRemaining': true, 'HoursRemaining--overtime': isOvertime}">
            <span>
                <span class="HoursRemaining__hours">{{value}}</span>
                <span>hour{{value !== 1 ? 's' : ''}} {{ isOvertime ? 'overtime' : 'remaining' }}</span>
            </span>
        </div>
    `,

    computed: {
        isOvertime() {
            return this.worked > this.required
        },

        value() {
            return Math.abs(this.required - this.worked)
        },
    },
}

import moment from 'moment';
import styles from './Duration.less';
import React, {Component} from 'react';

const TIME_FORMAT = 'H:m';

export default class Duration extends Component {
  constructor() {
    super();
    this.state = {hours: 0.0};
  }

  render() {
    return (
      <div className="Duration">
        <input className={styles.start} maxLength="5" ref="start" type="time" placeholder="HH:MM"/>
        <input className={styles.stop} maxLength="5" ref="stop" type="time" placeholder="HH:MM"/>
        <span className={styles.hours}>{this._calculateDuration().toFixed(1)}</span>
      </div>
    );
  }

  componentDidMount() {
    this.refs.start.addEventListener('change', () => this.forceUpdate());
    this.refs.stop.addEventListener('change', () => this.forceUpdate());
  }

  _calculateDuration() {
    if (!(this.refs.start && this.refs.stop)) return 0.0;
    const start = moment(this.refs.start.value, TIME_FORMAT);
    const stop = moment(this.refs.stop.value, TIME_FORMAT);
    return (Math.round(stop.diff(start, 'hour', true) * 2) / 2) || 0.0;
  }
}

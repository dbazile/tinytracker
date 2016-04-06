import React, {Component} from 'react';
import styles from './Day.less';
import Duration from './Duration';
import {aggregate, DAYS} from '../utils/time';

const TICK_INTERVAL = 15 * 60 * 1000;

export default class Day extends Component {
  static propTypes = {
    changed: React.PropTypes.func,
    name: React.PropTypes.string,
    times: React.PropTypes.array
  };

  constructor() {
    super();
    this._durationChanged = this._durationChanged.bind(this);
    this._tick = this._tick.bind(this);
  }

  componentDidMount() {
    this._tickerId = setInterval(this._tick, TICK_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this._tickerId);
  }

  render() {
    const classes = `${styles.root} ${this._isToday}`;
    return (
      <div className={classes}>
        <h2 className={styles.name}>{this.props.name}</h2>
        <div className={styles.hours}>{this._hours}</div>
        {this.props.times.map(([start, stop], index) =>
          <Duration
            key={index}
            start={start}
            stop={stop}
            changed={tuple => this._durationChanged(index, tuple)}/>
        )}
      </div>
    );
  }

  get _hours() {
    return aggregate(this.props.times).toFixed(1);
  }

  get _isToday() {
    return new Date().getDay() === DAYS.indexOf(this.props.name) ? 'is-today' : '';
  }

  _durationChanged(index, tuple) {
    const {times, changed} = this.props;
    changed(times.map((t, i) => i === index ? tuple : t));  // Bootleg Redux
  }

  _tick() {
      console.debug('@day#tick (next in %d) ms', TICK_INTERVAL);
      this.forceUpdate();  // FIXME - probably not the right answer here but it's almost 2 am...  Scratch that, it IS 2 am
  }
}

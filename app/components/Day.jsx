import React, {Component} from 'react';
import styles from './Day.less';
import Duration from './Duration';
import {aggregate, DAYS} from '../utils/time';

export default class Day extends Component {
  static propTypes = {
    changed: React.PropTypes.func,
    name: React.PropTypes.string,
    times: React.PropTypes.array
  };

  constructor() {
    super();
    this._durationChanged = this._durationChanged.bind(this);
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
}

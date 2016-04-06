import React, {Component} from 'react';
import styles from './Day.less';
import Duration from './Duration';
import {aggregate} from '../utils/time';

const NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export default class Day extends Component {
  static propTypes = {
    changed: React.PropTypes.func,
    index: React.PropTypes.number,
    times: React.PropTypes.array
  };

  constructor() {
    super();
    this._durationChanged = this._durationChanged.bind(this);
  }

  render() {
    const name = NAMES[this.props.index];
    const classes = `Day ${this._isToday() ? 'is-today' : ''}`;
    return (
      <div className={classes}>
        <h2 className={styles.name}>{name}</h2>
        <div className={styles.hours}>{this._calculateHours().toFixed(1)}</div>
        {this.props.times.map(([start, stop], index) =>
          <Duration
            key={index}
            start={start}
            stop={stop}
            changed={this._durationChanged}/>
        )}
      </div>
    );
  }

  _calculateHours() {
    return aggregate(this.props.times);
  }

  _durationChanged([start, stop]) {
    debugger;
  }

  _isToday() {
    return new Date().getDay() === this.props.index;
  }
}

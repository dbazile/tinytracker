import styles from './Day.less';
import React, {Component} from 'react';
import Duration from './Duration';

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
    index: React.PropTypes.number
  };

  render() {
    const name = NAMES[this.props.index];
    const classes = `Day ${this._isToday() ? 'is-today' : ''}`;
    return (
      <div className={classes}>
        <h2 className={styles.name}>{name}</h2>
        <div className={styles.hours}>5.0</div>
        <Duration/>
        <Duration/>
        <Duration/>
        <Duration/>
        <Duration/>
      </div>
    );
  }

  _isToday() {
    return new Date().getDay() === this.props.index;
  }
}

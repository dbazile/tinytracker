import React, {Component} from 'react';
import styles from './HoursRequired.less';

export default class HoursRequired extends Component {
  static propTypes = {
    changed: React.PropTypes.func,
    hours: React.PropTypes.number
  };

  constructor() {
    super();
    this._emitChange = this._emitChange.bind(this);
  }

  render() {
    return (
      <div className={styles.root}>
        <input
          ref="hours"
          className={styles.hours}
          value={this.props.hours}
          onChange={this._emitChange}
          type="number"
          min="0"
          max="60"/> hours required this week
      </div>
    );
  }

  _emitChange(event) {
    this.props.changed(event.target.value);
  }
}

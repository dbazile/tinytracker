import React, {Component} from 'react';
import styles from './HoursRequired.css';

export default class HoursRequired extends Component {
  static propTypes = {
    changed: React.PropTypes.func,
    hours: React.PropTypes.number
  };

  constructor() {
    super();
    this._notify = this._notify.bind(this);
  }

  render() {
    return (
      <div className={`${styles.root} ${this._irregular}`}>
        <label>
          <input
            ref="hours"
            className={styles.hours}
            value={this.props.hours}
            onChange={this._notify}
            type="number"
            min="0"
            max="60"/>
          <span>hours required this week</span>
        </label>
      </div>
    );
  }

  get _irregular() {
    return (this.props.hours !== 40) ? styles.irregular : '';
  }

  _notify(event) {
    this.props.changed(event.target.value);
  }
}

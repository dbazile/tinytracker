import React, {Component} from 'react';
import styles from './Application.css';
import Week from './Week';
import HoursRequired from './HoursRequired';
import HoursRemaining from './HoursRemaining';
import {aggregate} from '../utils/time';
import {clear, deserialize, serialize} from '../utils/store';

export default class Application extends Component {
  state = deserialize();

  componentDidUpdate() {
    serialize(this.state);
  }

  render() {
    return (
      <div className={styles.root}>
        <h1>tinytracker</h1>

        <Week days={this.state.days} changed={this._daysChanged}/>

        <div className={styles.metrics}>
          <HoursRequired hours={this.state.requiredHours} changed={this._requiredHoursChanged}/>
          <HoursRemaining worked={this._hoursWorked} required={this.state.requiredHours}/>
        </div>

        <footer className={styles.controls}>
          <button className={styles.growButton} onClick={this._grow}><span className={styles.icon}>+</span></button>
          <button className={`${styles.shrinkButton} ${this._canShrink ? '' : styles.isDisabled}`} onClick={this._shrink}><span className={styles.icon}>&ndash;</span></button>
          <button className={styles.resetButton} onClick={this._reset}>Reset</button>
        </footer>
      </div>
    );
  }

  get _canShrink() {
    return !this.state.days.some(d => d.times.slice(-1).some(t => t.some(Boolean)));
  }

  get _hoursWorked() {
    return this.state.days.reduce((sum, day) => sum + aggregate(day.times), 0.0);
  }

  get _rows() {
    return this.state.days.reduce((count, day) => Math.max(count, day.times.length), 0)
  }

  _daysChanged = (days) => {
    this.setState({days});
  }

  _grow = () => {
    this.setState({
      days: this.state.days.map(d => Object.assign({}, d, {
        times: [...d.times, []]
      }))
    });
  }

  _requiredHoursChanged = (value) => {
    this.setState({requiredHours: parseFloat(value)});
  }

  _reset = () => {
    clear();
    this.setState(deserialize());
  }

  _shrink = () => {
    if (!this._canShrink) {
      return;
    }

    this.setState({
      days: this.state.days.map(d => Object.assign({}, d, {
        times: d.times.slice(0, -1)
      }))
    });
  }
}

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
        <footer className={styles.metrics}>
          <HoursRequired hours={this.state.requiredHours} changed={this._requiredHoursChanged}/>
          <HoursRemaining worked={this._hoursWorked} required={this.state.requiredHours}/>
          <button className={styles.reset} onClick={this._reset}>Reset</button>
        </footer>
      </div>
    );
  }

  get _hoursWorked() {
    return this.state.days.reduce((sum, day) => sum + aggregate(day.times), 0.0);
  }

  _daysChanged = (days) => {
    this.setState({days});
  }

  _requiredHoursChanged = (value) => {
    this.setState({requiredHours: parseFloat(value)});
  }

  _reset = () => {
    clear();
    this.setState(deserialize());
  }
}

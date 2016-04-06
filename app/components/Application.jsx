import React, {Component} from 'react';
import styles from './Application.less';
import Week from './Week';
import HoursRequired from './HoursRequired';
import HoursRemaining from './HoursRemaining';
import {aggregate, DAYS} from '../utils/time';

const [, MON, TUE, WED, THU, FRI] = DAYS;

export default class Application extends Component {
  constructor() {
    super();
    this._daysChanged = this._daysChanged.bind(this);
    this._requiredHoursChanged = this._requiredHoursChanged.bind(this);
    this.state = {
      days: [
        {name: MON, times: [[], [], [], [], []]},
        {name: TUE, times: [['09:00', '17:00'], [], [], [], []]},
        {name: WED, times: [[], [], [], [], []]},
        {name: THU, times: [[], [], [], [], ['16:00', '19:00']]},
        {name: FRI, times: [[], [], [], [], []]}
      ],
      requiredHours: 40
    };
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
      </div>
    );
  }

  get _hoursWorked() {
    return this.state.days.reduce((sum, day) => sum + aggregate(day.times), 0.0);
  }

  _daysChanged(days) {
    this.setState({days});
  }

  _requiredHoursChanged(value) {
    this.setState({requiredHours: parseFloat(value)});
  }
}

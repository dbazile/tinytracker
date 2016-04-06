import styles from './Application.less';
import React, {Component} from 'react';
import Week from './Week';
import HoursRequired from './HoursRequired';
import HoursRemaining from './HoursRemaining';
import {aggregate, DAYS} from '../utils/time';

const [, MON, TUE, WED, THU, FRI] = DAYS;

export default class Application extends Component {
  constructor() {
    super();
    this._durationsChanged = this._durationsChanged.bind(this);
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
        <Week days={this.state.days} changed={this._durationsChanged}/>
        <HoursRequired hours={this.state.requiredHours} changed={this._requiredHoursChanged}/>
        <HoursRemaining worked={this._hoursWorked} required={this.state.requiredHours}/>
      </div>
    );
  }

  get _hoursWorked() {
    return this.state.days.reduce((sum, day) => sum + aggregate(day.times), 0.0);
  }

  _durationsChanged(value) {
    this.setState({workdays});
  }

  _requiredHoursChanged(value) {
    this.setState({requiredHours: parseFloat(value)});
  }
}

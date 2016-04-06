import './Application.less';
import React, {Component} from 'react';
import Week from './Week';
import HoursRequired from './HoursRequired';
import HoursRemaining from './HoursRemaining';
import {aggregate} from '../utils/time';

export default class Application extends Component {
  constructor() {
    super();
    this._durationsChanged = this._durationsChanged.bind(this);
    this._requiredHoursChanged = this._requiredHoursChanged.bind(this);
    this.state = {
      days: [
        {index: 1, times: [[], [], [], [], []]},
        {index: 2, times: [['09:00', '17:00'], [], [], [], []]},
        {index: 3, times: [[], [], [], [], []]},
        {index: 4, times: [[], [], [], [], ['16:00', '19:00']]},
        {index: 5, times: [[], [], [], [], []]}
      ],
      requiredHours: 40
    };
  }

  render() {
    const hoursWorked = this._calculateHoursWorked();
    return (
      <div className="Application">
        <h1>tinytracker</h1>
        <Week days={this.state.days} changed={this._durationsChanged}/>
        <HoursRequired hours={this.state.requiredHours} changed={this._requiredHoursChanged}/>
        <HoursRemaining worked={hoursWorked} required={this.state.requiredHours}/>
      </div>
    );
  }

  _calculateHoursWorked() {
    return this.state.days.reduce((sum, day) => sum + aggregate(day.times), 0.0);
  }

  _durationsChanged(value) {
    this.setState({workdays});
  }

  _requiredHoursChanged(value) {
    this.setState({requiredHours: parseFloat(value)});
  }
}

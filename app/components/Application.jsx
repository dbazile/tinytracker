import './Application.less';
import React, {Component} from 'react';
import Week from './Week';
import HoursRequired from './HoursRequired';
import HoursRemaining from './HoursRemaining';

export default class Application extends Component {
  render() {
    return (
      <div className="Application">
        <h1>tinytracker</h1>
        <Week/>
        <HoursRequired/>
        <HoursRemaining worked={32} required={40}/>
      </div>
    );
  }
}

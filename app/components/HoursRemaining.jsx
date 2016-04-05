import './HoursRemaining.less';
import React, {Component} from 'react';
import Day from './Day';

export default class HoursRemaining extends Component {
  render() {
    return (
      <ul className="HoursRemaining">
        {Math.round(this.props.required - this.props.worked)} hours remaining
      </ul>
    );
  }
}

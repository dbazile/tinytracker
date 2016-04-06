import './HoursRequired.less';
import React, {Component} from 'react';

export default class HoursRequired extends Component {
  render() {
    return (
      <ul className="HoursRequired">
        <input type="number" min="0" max="60" className="foo" ref="hours"/> hours required this week
      </ul>
    );
  }
}

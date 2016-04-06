import './HoursRequired.less';
import React, {Component} from 'react';

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
      <ul className="HoursRequired">
        <input
          ref="hours"
          className="hours"
          value={this.props.hours}
          onChange={this._emitChange}
          type="number"
          min="0"
          max="60"/> hours required this week
      </ul>
    );
  }

  _emitChange(event) {
    this.props.changed(event.target.value);
  }
}

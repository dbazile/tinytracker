import './HoursRemaining.less';
import React, {Component} from 'react';

export default class HoursRemaining extends Component {
  static propTypes = {
    required: React.PropTypes.number,
    worked: React.PropTypes.number
  };

  render() {
    return (
      <ul className="HoursRemaining">
        {Math.round(this.props.required - this.props.worked)} hours remaining
      </ul>
    );
  }
}

import React, {Component} from 'react';
import styles from './HoursRemaining.less';

export default class HoursRemaining extends Component {
  static propTypes = {
    required: React.PropTypes.number,
    worked: React.PropTypes.number
  };

  render() {
    return (
      <div className={styles.root}>
        <span className={styles.hours}>{this._hours}</span> hours remaining
      </div>
    );
  }

  get _hours() {
    return parseFloat(this.props.required - this.props.worked).toFixed(1);
  }
}

import React, {Component} from 'react';
import styles from './HoursRemaining.css';

export default class HoursRemaining extends Component {
  static propTypes = {
    required: React.PropTypes.number,
    worked: React.PropTypes.number
  };

  render() {
    return (
      <div className={`${styles.root} ${this._overtime}`}>
        <span className={styles.label}>
          <span className={styles.hours}>{this._hours}</span>
          hours {this._overtime ? 'overtime' : 'remain'}
        </span>
      </div>
    );
  }

  get _hours() {
    return Math.abs(parseFloat(this.props.required - this.props.worked)).toFixed(1);
  }

  get _overtime() {
    return parseFloat(this.props.worked) > parseFloat(this.props.required) ? styles.overtime : '';
  }
}

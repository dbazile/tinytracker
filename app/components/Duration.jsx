import React, {Component} from 'react';
import styles from './Duration.less';
import {diff} from '../utils/time';

export default class Duration extends Component {
  static propTypes = {
    changed: React.PropTypes.func,
    start: React.PropTypes.string,
    stop: React.PropTypes.string
  };

  constructor() {
    super();
    this._recalculate = this._recalculate.bind(this);
    this._notify = this._notify.bind(this);
    this.state = {hours: 0.0};
  }

  render() {
    return (
      <div className="Duration">
        <input ref="start" className={styles.start} value={this.props.start || ''} maxLength="5" placeholder="HH:MM" onChange={this._notify}/>
        <input ref="stop"  className={styles.stop}  value={this.props.stop || ''}  maxLength="5" placeholder="HH:MM" onChange={this._notify}/>
        <span className={styles.hours}>{this._calculate()}</span>
      </div>
    );
  }

  _calculate() {
    return diff([this.props.start, this.props.stop]).toFixed(1);
  }

  _notify() {
    this.props.changed([this.refs.start.value, this.refs.stop.value]);
  }

  _recalculate() {
    this.forceUpdate();
  }
}

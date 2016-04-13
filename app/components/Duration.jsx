import React, {Component} from 'react';
import styles from './Duration.css';
import {diff} from '../utils/time';

export default class Duration extends Component {
  static propTypes = {
    changed: React.PropTypes.func,
    start: React.PropTypes.string,
    stop: React.PropTypes.string
  };

  constructor() {
    super();
    this._notify = this._notify.bind(this);
  }

  render() {
    return (
      <div className={styles.root}>
        <input ref="start" className={styles.start} value={this.props.start || ''} maxLength="5" placeholder="HH:MM" onChange={this._notify}/>
        <input ref="stop"  className={styles.stop}  value={this.props.stop || ''}  maxLength="5" placeholder="HH:MM" onChange={this._notify}/>
        <span className={styles.hours}>{this._hours}</span>
      </div>
    );
  }

  get _hours() {
    return diff([this.props.start, this.props.stop]).toFixed(1);
  }

  _notify() {
    this.props.changed([this.refs.start.value, this.refs.stop.value]);
  }
}

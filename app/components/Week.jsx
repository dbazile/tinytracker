import React, {Component} from 'react';
import styles from './Week.less';
import Day from './Day';

export default class Week extends Component {
  static propTypes = {
    changed: React.PropTypes.func,
    days: React.PropTypes.arrayOf(React.PropTypes.object)
  };

  constructor() {
    super();
    this._dayChanged = this._dayChanged.bind(this);
  }

  render() {
    return (
      <ul className={styles.root}>
        {this.props.days.map(day =>
          <Day
            key={day.name}
            name={day.name}
            times={day.times}
            changed={times => this._dayChanged(day.name, times)}/>
        )}
      </ul>
    );
  }

  _dayChanged(name, times) {
    const {days, changed} = this.props;
    changed(days.map(d => d.name === name ? Object.assign({}, d, {times}) : d));  // MOAR Bootleg Redux
  }
}

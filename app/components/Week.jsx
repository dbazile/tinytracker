import React, {Component} from 'react';
import styles from './Week.less';
import Day from './Day';

export default class Week extends Component {
  static propTypes = {
    days: React.PropTypes.arrayOf(React.PropTypes.object)
  };

  render() {
    return (
      <ul className={styles.root}>
        {this.props.days.map(day =>
          <Day
            key={day.name}
            name={day.name}
            times={day.times}/>
        )}
      </ul>
    );
  }
}

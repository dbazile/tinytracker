import React, {Component} from 'react';
import './Week.less';
import Day from './Day';

export default class Week extends Component {
  static propTypes = {
    days: React.PropTypes.arrayOf(React.PropTypes.object)
  };

  render() {
    return (
      <ul className="Week">
        {this.props.days.map(day =>
          <Day
            key={day.index}
            index={day.index}
            times={day.times}/>
        )}
      </ul>
    );
  }
}

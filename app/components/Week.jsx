import React, {Component} from 'react';
import './Week.less';
import Day from './Day';

export default class Week extends Component {
  render() {
    return (
      <ul className="Week">
        {[1,2,3,4,5].map(n => <Day key={n} index={n}/>)}
      </ul>
    );
  }
}

import './Application.less';
import React, {Component} from 'react';
import Week from './Week';

export default class Application extends Component {
  render() {
    return (
      <div className="Application">
        <h1>tinytracker</h1>
        <Week/>
      </div>
    );
  }
}

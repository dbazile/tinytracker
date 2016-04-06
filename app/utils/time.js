import moment from 'moment';

const PARSE_FORMAT = 'H:m';

export const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export function aggregate(tuples) {
  return tuples.reduce((sum, tuple) => sum + diff(tuple), 0.0);
}

export function diff([start, stop]) {
  return parse(stop).diff(parse(start), 'hour', true) || 0.0;
}

//
// Internals
//

function parse(value) {
  return moment(value, PARSE_FORMAT);
}

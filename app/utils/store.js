import {DAYS} from '../utils/time';

const SERIALIZATION_KEY = 'state'
const [, MON, TUE, WED, THU, FRI] = DAYS;

// TODO pub/sub
// FIXME exported actions
// TODO testing

export function deserialize() {
  console.debug('@store deserialize');
  const serialized = localStorage.getItem(SERIALIZATION_KEY);
  if (serialized) {
    try {
      return JSON.parse(serialized);
    } catch (error) {
      console.warn('Deserialization failed');
    }
  }
  return generateState();
}

export function serialize(state) {
  console.debug('@store serialize', state);
  localStorage.setItem(SERIALIZATION_KEY, JSON.stringify(state));
}

//
// Internals
//

function generateState() {
  console.debug('@store generateState');
  return {
    days: [
      {name: MON, times: [[], [], [], [], []]},
      {name: TUE, times: [[], [], [], [], []]},
      {name: WED, times: [[], [], [], [], []]},
      {name: THU, times: [[], [], [], [], []]},
      {name: FRI, times: [[], [], [], [], []]}
    ],
    requiredHours: 40
  };
}

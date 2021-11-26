import createActions from 'src/client/lib/utils/create-actions';
import { createReducer } from 'redux-act';

export const initialState = {
  serverInfo: {
    numCores: null,
    loadThreshold: null,
  },
  history: [],
  notifications: [],
};

export const actions = createActions('simpleLoadMonitor', [
  'setField', 'setHistory', 'addNotification',
]);

export const reducer = createReducer({
  [actions.setField](state, { key, value }) {
    return { ...state, [key]: value };
  },

  [actions.setHistory](state, history) {
    return {
      ...state,
      history: history.map((e) => {
        e.date = new Date(e.timestamp);
        return e;
      }),
    };
  },

  [actions.addNotification](state, notification) {
    return { ...state, notifications: [notification, ...state.notifications] };
  },
}, initialState);

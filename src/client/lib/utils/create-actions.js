import { createAction } from 'redux-act';

export default (namespace, actions) => {
  return actions.reduce((result, action) => {
    result[action] = createAction(`${namespace}:${action}`); // eslint-disable-line
    return result;
  }, {});
};

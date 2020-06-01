export const combineReducers = (...reducers: Function[]) => (
  state: Object,
  action: Object
) => {
  return reducers.reduce((y, f) => f(y, action), state);
};

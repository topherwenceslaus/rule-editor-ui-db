import { errorReducer } from "./errorReducer";
import { loadingStateReducer } from "./loadingReducer";
import { ruleReducer } from "./ruleReducer";
import { combineReducers } from "../utils/combineReducers";
import { InitialAppStateType } from "../types/ruleTypes";

export const rootReducer = combineReducers(
  errorReducer,
  loadingStateReducer,
  ruleReducer
);

export const InitialAppState: InitialAppStateType = {
  isError: false,
  isLoading: false,
  errorMessage: "",
  rules: []
};

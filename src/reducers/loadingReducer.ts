import { LoadingState } from "../types/ruleTypes";
import {
  AppActions,
  FETCH_RULES,
  FETCH_RULES_SUCCESS,
  ADD_RULE,
  DELETE_RULE,
  UPDATE_RULE,
  API_FAILURE,
} from "../types/actionTypes";

export const initialState: LoadingState = {
  isLoading: false,
};

export const loadingStateReducer = (
  state = initialState,
  action: AppActions
) => {
  switch (action.type) {
    case FETCH_RULES: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case FETCH_RULES_SUCCESS:
    case ADD_RULE:
    case DELETE_RULE:
    case UPDATE_RULE:
    case API_FAILURE: {
      return { ...state, isLoading: false };
    }
    default: {
      return state;
    }
  }
};

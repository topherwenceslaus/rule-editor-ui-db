import { APIError } from "../types/ruleTypes";
import {
  AppActions,
  API_FAILURE,
  FETCH_RULES,
  ADD_RULE,
  UPDATE_RULE,
  DELETE_RULE,
  FETCH_RULES_SUCCESS,
} from "../types/actionTypes";

export const initialState: APIError = {
  isError: false,
  errorMessage: "",
};

export const errorReducer = (state = initialState, action: AppActions) => {
  switch (action.type) {
    case API_FAILURE: {
      return { ...state, isError: true, errorMessage: action.errorMessage };
    }
    case FETCH_RULES:
    case ADD_RULE:
    case UPDATE_RULE:
    case DELETE_RULE:
    case FETCH_RULES_SUCCESS: {
      return {
        ...state,
        isError: false,
        errorMessage: "",
      };
    }
    default: {
      return state;
    }
  }
};

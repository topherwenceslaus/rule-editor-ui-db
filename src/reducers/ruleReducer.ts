import {
  AppActions,
  FETCH_RULES_SUCCESS,
  ADD_RULE,
  UPDATE_RULE,
  DELETE_RULE,
} from "../types/actionTypes";
import { Rule } from "../types/ruleTypes";

export const InitialAppState = {
  rules: [],
};

export const ruleReducer = (state = InitialAppState, action: AppActions) => {
  switch (action.type) {
    case FETCH_RULES_SUCCESS: {
      return {
        ...state,
        rules: [...action.rules],
      };
    }
    case ADD_RULE: {
      return {
        ...state,
        rules: [...state.rules, action.rule],
      };
    }

    case UPDATE_RULE: {
      const updatedRules = state.rules.map((rule: Rule) => {
        if (rule.id === action.id) {
          return action.rule;
        }
        return rule;
      });

      return { ...state, rules: [...updatedRules] };
    }

    case DELETE_RULE: {
      const filteredRules = state.rules.filter(
        (rule: Rule) => rule.id !== action.id
      );
      return { ...state, rules: [...filteredRules] };
    }

    default: {
      return state;
    }
  }
};

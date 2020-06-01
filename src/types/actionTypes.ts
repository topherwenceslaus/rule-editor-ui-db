import { Rule } from "./ruleTypes";

export const FETCH_RULES = "FETCH_RULES";
export const FETCH_RULES_SUCCESS = "FETCH_RULES_SUCCESS";
export const API_FAILURE = "API_FAILURE";
export const ADD_RULE = "ADD_RULE";
export const UPDATE_RULE = "UPDATE_RULE";
export const DELETE_RULE = "DELETE_RULE";

interface fetchRules {
  type: typeof FETCH_RULES;
}

interface fetchRulesSuccess {
  type: typeof FETCH_RULES_SUCCESS;
  rules: Rule[];
}

interface apiFailure {
  type: typeof API_FAILURE;
  errorMessage: string;
}

interface addRule {
  type: typeof ADD_RULE;
  rule: Rule;
}

interface updateRule {
  type: typeof UPDATE_RULE;
  rule: Rule;
  id: string;
}

interface deleteRule {
  type: typeof DELETE_RULE;
  id: string;
}

export type AppActions =
  | fetchRules
  | fetchRulesSuccess
  | apiFailure
  | updateRule
  | deleteRule
  | addRule;

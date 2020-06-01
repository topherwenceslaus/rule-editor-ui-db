export interface Condition {
  id: string;
  name: string;
  operator: string;
  dataType: string;
  value: number | string | Date;
}

export interface SecondaryCondition extends Condition {
  baseOperator: string;
}

export interface Rule {
  name: string;
  id: string;
  key: string;
  createdAt: string;
  modifiedAt: string;
  priority: string;
  primary: Condition[];
  secondary?: SecondaryCondition[];
}

export interface APIError {
  isError: boolean;
  errorMessage: string;
}

export interface LoadingState {
  isLoading: boolean;
}

export interface ConditionState {
  showSecondary: boolean;
  updateMode: boolean;
}

export interface InitialAppStateType extends APIError, LoadingState {
  rules: Rule[];
}

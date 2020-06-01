import { ruleReducer } from "../reducers/ruleReducer";
import {
  FETCH_RULES_SUCCESS,
  UPDATE_RULE,
  DELETE_RULE,
  ADD_RULE,
} from "../types/actionTypes";
import { Rule } from "../types/ruleTypes";

const mockRule = {
  key: "65fb224a-031a-4d7f-bbf6-600e2a12365f",
  id: "b9386d04-d69c-4f6a-b4a3-c211febda785",
  priority: "medium",
  name: "monthly rental and zip code",
  createdAt: "Mon Jun 01 2020",
  modifiedAt: "Mon Jun 01 2020",
  primary: [
    {
      name: "monthly rental",
      operator: "GREATER_THAN",
      value: "400",
      id: "bbe936e3-85fb-40c5-88ef-aed0c3328041",
      dataType: "string",
    },
  ],
  secondary: [
    {
      name: "zipcode",
      operator: "INCLUDES",
      value: "560102, 567892, 10020",
      id: "6d3042f6-8bcb-4b0a-a9dc-6492e458c609",
      dataType: "string",
      baseOperator: "and",
    },
  ],
};

describe("rule reducer ", () => {
  test("should set rules after successful fetch", () => {
    expect(
      ruleReducer(
        { rules: [] },
        { type: FETCH_RULES_SUCCESS, rules: [mockRule] }
      ).rules
    ).toStrictEqual([mockRule]);
  });

  test("should update  rule", () => {
    const updatedObj: Rule = { ...mockRule, name: "updated rule" };

    expect(
      ruleReducer(
        { rules: [mockRule] },
        {
          type: UPDATE_RULE,
          id: "b9386d04-d69c-4f6a-b4a3-c211febda785",
          rule: updatedObj,
        }
      ).rules
    ).toStrictEqual([updatedObj]);
  });

  test("should add rule", () => {
    expect(
      ruleReducer(
        { rules: [] },
        {
          type: ADD_RULE,
          rule: mockRule,
        }
      ).rules
    ).toStrictEqual([mockRule]);
  });

  test("should delete rule", () => {
    expect(
      ruleReducer(
        { rules: [mockRule] },
        {
          type: DELETE_RULE,
          id: "b9386d04-d69c-4f6a-b4a3-c211febda785",
        }
      ).rules
    ).toStrictEqual([]);
  });
});

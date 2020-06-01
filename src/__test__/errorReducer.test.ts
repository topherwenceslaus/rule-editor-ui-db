import { errorReducer, initialState } from "../reducers/errorReducer";
import { API_FAILURE, FETCH_RULES, DELETE_RULE } from "../types/actionTypes";

describe("error reducer", () => {
  test("should set error", () => {
    expect(
      errorReducer(initialState, { type: API_FAILURE, errorMessage: "error" })
        .isError
    ).toBeTruthy();

    expect(
      errorReducer(initialState, { type: API_FAILURE, errorMessage: "error" })
        .errorMessage
    ).toBe("error");
  });

  test("should set error as false to all other actions", () => {
    expect(
      errorReducer(initialState, { type: FETCH_RULES }).isError
    ).toBeFalsy();

    expect(errorReducer(initialState, { type: FETCH_RULES }).errorMessage).toBe(
      ""
    );
    expect(
      errorReducer(initialState, { type: DELETE_RULE, id: "323" }).errorMessage
    ).toBe("");
  });
});

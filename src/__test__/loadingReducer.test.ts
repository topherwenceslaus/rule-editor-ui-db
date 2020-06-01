import { loadingStateReducer, initialState } from "../reducers/loadingReducer";
import { FETCH_RULES, API_FAILURE, DELETE_RULE } from "../types/actionTypes";

describe("loading reducer", () => {
  test("should set loading to true", () => {
    expect(
      loadingStateReducer(initialState, { type: FETCH_RULES }).isLoading
    ).toBeTruthy();
  });

  test("should set loading false to all other actions", () => {
    expect(
      loadingStateReducer(initialState, { type: API_FAILURE, errorMessage: "" })
        .isLoading
    ).toBeFalsy();

    expect(
      loadingStateReducer(initialState, { type: DELETE_RULE, id: "" }).isLoading
    ).toBeFalsy();
  });
});

import React, { ReactElement, FC, useReducer, useEffect } from "react";
import { fetchAPI } from "./utils/fetch";
import { endPoint } from "./constants/API";
import { rootReducer, InitialAppState } from "./reducers";
import {
  AppActions,
  FETCH_RULES,
  FETCH_RULES_SUCCESS,
  API_FAILURE,
} from "./types/actionTypes";
import { HTTPMethods } from "./constants/HTTPMethods";

export const AppContext = React.createContext<any | null>({
  state: InitialAppState,
  dispatch: (action: AppActions) => {},
});

interface IProps {
  children: ReactElement;
}

const AppState: FC<IProps> = ({ children }) => {
  const [appState, appDispatch] = useReducer(rootReducer, InitialAppState);

  let isRequestInFlight = false;
  useEffect(() => {
    appDispatch({
      type: FETCH_RULES,
    });
    const fetchRules = async () => {
      try {
        const data = await fetchAPI(endPoint, HTTPMethods.GET);
        if (!isRequestInFlight) {
          appDispatch({
            type: FETCH_RULES_SUCCESS,
            rules: data,
          });
        }
      } catch (e) {
        appDispatch({
          type: API_FAILURE,
          errorMessage: "Something went wrong.Please try again later",
        });
      }
    };

    fetchRules();

    return () => {
      isRequestInFlight = true;
    };
  }, []);

  return (
    <AppContext.Provider value={{ appState, appDispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppState;

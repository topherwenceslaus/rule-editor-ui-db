import { HTTPMethods } from "../constants/HTTPMethods";

export const fetchAPI = (
  url: string,
  method: HTTPMethods,
  payload: any = {}
) => {
  return fetch(url, {
    method,
    mode: "cors",
    cache: "no-cache",
  })
    .then((data) => data.json())
    .then((data) => data);
};

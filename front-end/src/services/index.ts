import axios from "axios";
import isEmpty from "lodash/isEmpty";
import { stringify } from "query-string";

axios.defaults.baseURL = process.env.REACT_APP_API_URL_BASE;

export interface RequestParams {
    url: string;
    method: "POST" | "PUT" | "GET" | "DELETE";
    params?: Record<string, unknown>;
    payload?: Record<string, unknown>;
    token?: string;
}

const API = {
    Request: async <A>({
        url,
        method,
        params = {},
        payload = {},
        token,
    }: RequestParams): Promise<A> => {
        const query = !isEmpty(params)
            ? `?${stringify({
                  ...params,
              })}`
            : "";
        try {
            const response = await axios({
                method,
                url: `${url}${query}`,
                headers: {
                    "content-type": "application/json; charset=utf-8",
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
                ...(payload && { data: JSON.stringify(payload) }),
            });
            return new Promise((resolve) => resolve(response.data));
        } catch (error) {
            return new Promise((resolve, reject) =>
                reject({
                    status: error.response.status,
                    ...error.response.data,
                }),
            );
        }
    },
};

export default API;

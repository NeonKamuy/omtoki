import { AxiosResponse } from "axios";
import { IARequest } from "./interfaces";

export default class Requests {
    public static handleResponse(response: AxiosResponse<any>) {
        const { data } = response;

        if (
            response.status !== 200 &&
            response.status !== 201 &&
            response.status !== 304
        ) {
            throw new Error(data);
        }

        return data;
    }

    public static wrapInPromise<T extends any>(
        promise: Promise<AxiosResponse<any>>,
        args: Omit<IARequest<any>, "data">
    ): Promise<T> {
        return new Promise((res, rej) => {
            promise
                .then((response) => {
                    return response;
                })
                .then((res) => Requests.handleResponse(res))
                .then((result) => res(result))
                .catch((e) => {
                    if (args.alertOnError) alert(e);
                    rej();
                });
        });
    }
}

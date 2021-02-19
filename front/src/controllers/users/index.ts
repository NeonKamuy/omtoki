import axios from "axios";
import { __CONFIG__ } from "../../config";
import { IUserBase } from "../../shared/interfaces/user";
import { IARequest } from "../interfaces";
import Requests from "../requests";

export default class UserController {
    public static getAll(args: IARequest<null>) {
        axios
            .get(`${__CONFIG__.backendURL}/users/`)
            .then((res) =>
                Requests.handleResponse({ response: res, cb: args.onLoaded })
            );
    }

    public static addUser(args: IARequest<IUserBase>): Promise<void> {
        return new Promise((res, rej) => {
            axios
                .post(`${__CONFIG__.backendURL}/users/`, args.data)
                .then((response) => {
                    res();
                    return response;
                })
                .then((res) =>
                    Requests.handleResponse({
                        response: res,
                        cb: args.onLoaded,
                    })
                )
                .catch((e) => {
                    alert(e);
                    throw e;
                });
        });
    }
}

import axios from "axios";
import { __CONFIG__ } from "../../config";
import { IIndexedUser, IUserBase } from "../../shared/interfaces/user";
import { IARequest } from "../interfaces";
import Requests from "../requests";

export default class UserController {
    public static getAll(args: IARequest<null>) {
        console.log(axios);
        axios.get(`${__CONFIG__.backendURL}/users/`).then(res => Requests.handleResponse({ response: res, cb: args.onLoaded }));
    }

    public static addUser(args: IARequest<IUserBase>) {
        axios.post(`${__CONFIG__.backendURL}/users/`, args.data).then(res => Requests.handleResponse({response: res, cb: args.onLoaded }));
    }
}
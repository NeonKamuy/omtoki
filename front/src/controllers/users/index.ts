import axios from "axios";
import { __CONFIG__ } from "../../config";
import { IIndexedUserMeta, IUserBase } from "../../shared/interfaces/user";
import { IARequest } from "../interfaces";
import Requests from "../requests";

export default class UserController {
    public static getAll(): Promise<IIndexedUserMeta[]> {
        return Requests.wrapInPromise(
            axios.get(`${__CONFIG__.backendURL}/users/`),
            {}
        );
    }

    public static addUser(args: IARequest<IUserBase>): Promise<void> {
        return Requests.wrapInPromise(
            axios.post(`${__CONFIG__.backendURL}/users/`, args.data),
            {}
        );
    }
}

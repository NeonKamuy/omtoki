import axios from "axios";
import { __CONFIG__ } from "../../config";
import { IPagination } from "../../shared/interfaces/pagination";
import { IIndexedUserMeta } from "../../shared/interfaces/user";
import { IARequest } from "../interfaces";
import Requests from "../requests";

export default class AdminController {
    public static login(args: IARequest<{ accessToken: string }>) {
        const { accessToken } = args.data;
        const params: any = { accessToken };

        return Requests.wrapInPromise(
            axios.get(`${__CONFIG__.backendURL}/admin/main/login?`, {
                params,
            }),
            args
        );
    }

    public static getPendingUsers(
        args: IARequest<{ pagination?: IPagination; accessToken: string }>
    ): Promise<{ pendingUsers: IIndexedUserMeta[]; pageCount: number }> {
        let params: any = { accessToken: args.data.accessToken };
        if (args.data.pagination) {
            const { page, perPage } = args.data.pagination;
            params.page = page;
            params.perPage = perPage;
        }

        return Requests.wrapInPromise(
            axios.get(`${__CONFIG__.backendURL}/admin/users/pending/get?`, {
                params,
            }),
            args
        );
    }

    public static submitUser(
        args: IARequest<{ userId: string; accessToken: string }>
    ): Promise<void> {
        return Requests.wrapInPromise(
            axios.get(`${__CONFIG__.backendURL}/admin/users/pending/accept?`, {
                params: {
                    userId: args.data.userId,
                    accessToken: args.data.accessToken,
                },
            }),
            args
        );
    }

    public static declineUser(
        args: IARequest<{ userId: string; accessToken: string }>
    ): Promise<void> {
        return Requests.wrapInPromise(
            axios.get(`${__CONFIG__.backendURL}/admin/users/pending/decline?`, {
                params: {
                    userId: args.data.userId,
                    accessToken: args.data.accessToken,
                },
            }),
            args
        );
    }
}

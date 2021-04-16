import { useCallback, useEffect, useState } from "react";
import AdminController from ".";
import { IPagination } from "../../shared/interfaces/pagination";
import { IIndexedUserMeta } from "../../shared/interfaces/user";

// Get Attendees By Id
export const usePendingUsers = (
    accessToken: string,
    pagination: IPagination
) => {
    const [symbol, setSymbol] = useState(Symbol());
    const forceReload = useCallback(() => {
        setSymbol(Symbol());
    }, []);

    const [pendingUsers, setPendingUsers] = useState<{
        pendingUsers: IIndexedUserMeta[];
        pageCount: number;
    }>({
        pendingUsers: [],
        pageCount: 1,
    });

    useEffect(() => {
        AdminController.getPendingUsers({
            data: { accessToken, pagination },
        }).then((res) => {
            setPendingUsers({
                pageCount: res.pageCount,
                pendingUsers: res.pendingUsers,
            });
        });
    }, [pagination, symbol]);

    return {
        pendingUsers: pendingUsers.pendingUsers,
        pageCount: pendingUsers.pageCount,
        forceReload,
    };
};

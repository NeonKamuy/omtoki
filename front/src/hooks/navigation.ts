import React, { useCallback } from "react";
import { useHistory } from "react-router";

export const useNavigation = () => {
    const history = useHistory();

    const toLoginPage = useCallback(
        (redirectionPath: IRedirectionPath, linkOnly = false): any => {
            const link = `/admin/login/${redirectionPath}`;
            if (linkOnly) return link;
            history.push(link);
        },
        []
    );

    return {
        toLoginPage,
    };
};

export type IRedirectionPath = keyof typeof RedirectionPath;

export const RedirectionPath = {
    pendingUsers: "/admin/pending-users"
};
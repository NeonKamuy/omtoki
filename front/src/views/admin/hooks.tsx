import React, { useCallback, useMemo } from "react";
import { Button } from "react-bootstrap";
import { __CONFIG__ } from "../../config";
import { IIndexedUserMeta } from "../../shared/interfaces/user";

export function usePendingUsersTable(
    pendingUsers: IIndexedUserMeta[],
    submitUser: (userId: string) => void,
    declineUser: (userId: string) => void
) {
    const table = useMemo(() => {
        const td: any[][] = [];

        for (const user of pendingUsers) {
            const tr: any[] = [];
            tr.push(
                <td>
                    <div
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 50,
                            backgroundImage: `url('${__CONFIG__.backendURL}/users/picture/${user.id}')`,
                            backgroundSize: "cover",
                        }}
                    ></div>
                </td>,
                <td>{user.name}</td>,
                <td>{user.description}</td>,
                <td>{user.skills}</td>,
                <td>{user.tg}</td>,
                <td>
                    <Button
                        variant="success"
                        onClick={() => submitUser(user.id)}
                    >
                        Подтвердить
                    </Button>
                </td>,
                <td>
                    <Button
                        variant="danger"
                        onClick={() => declineUser(user.id)}
                    >
                        Отклонить
                    </Button>
                </td>
            );
            td.push(tr);
        }

        return td;
    }, [pendingUsers]);

    return table;
}

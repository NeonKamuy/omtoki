import { useState, useEffect } from "react";
import UserController from ".";
import { IIndexedUserMeta } from "../../shared/interfaces/user";

// Get All Users
export const useUsers = () => {
    const [users, setUsers] = useState([] as IIndexedUserMeta[]);

    useEffect(() => {
        UserController.getAll().then((res) => setUsers(res));
    }, []);

    return users;
};

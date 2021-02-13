import { useState, useEffect, useMemo } from "react";
import UserController from "../../controllers/users";
import { IIndexedUser } from "../../shared/interfaces/user";

// Get All Users
export const useUsers = () => {
    const [users, setUsers] = useState([] as IIndexedUser[]);

    useEffect(() => {
        UserController.getAll({ data: null, onLoaded: setUsers });
    }, []);

    return users;
}

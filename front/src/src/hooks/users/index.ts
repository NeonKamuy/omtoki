import { useState, useEffect, useMemo } from "react";
import UserController from "../../controllers/users";
import { IIndexedUser } from "../../shared/interfaces/user";

// Get All Users
export const useUsers = () => {
    const [users, setUsers] = useState([] as IIndexedUser[]);

    useEffect(() => {
        UserController.getAll({ onLoaded: setUsers });
    }, []);

    return users;
}

// Get User Triplets
export const useUserTriplets = () => {
    const users = useUsers();

    const userTriplets = useMemo(() => {
        const response: IIndexedUser[][] = [];
        let currentArr: IIndexedUser[] = [];

        for (let i = 0; i < users.length; ++i) {
            const user = users[i];
            currentArr.push(user);

            if (currentArr.length === 3 || i === users.length - 1) {
                response.push(currentArr);
                currentArr = [];
            }
        }

        return response;
    }, [users]);

    return userTriplets;
}
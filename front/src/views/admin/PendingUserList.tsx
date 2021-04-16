import React, { useCallback, useMemo, useRef, useState } from "react";
import { getAccessToken, __CONFIG__ } from "../../config";
import { usePagination } from "../../hooks/pagination";
import { useNavigation } from "../../hooks/navigation";
import { usePendingUsers } from "../../controllers/admin/hooks";
import { Button, Container, Row, Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { usePendingUsersTable } from "./hooks";
import AdminController from "../../controllers/admin";
import { LoadingModal } from "../../components/loading-modal";

export const PendingUserList: React.FC<{}> = () => {
    const accessToken = getAccessToken();
    const accessTokenRef = useRef(accessToken);
    accessTokenRef.current = accessToken;

    const navigation = useNavigation();
    if (!accessToken) navigation.toLoginPage("pendingUsers");

    const { pagination, handlePageChange } = usePagination();
    const {
        pendingUsers,
        pageCount,
        forceReload: forceReloadPendingUsers,
    } = usePendingUsers(accessToken, pagination);

    const [isLoading, setIsLoading] = useState(false);

    const submitUser = useCallback((userId: string) => {
        setIsLoading(true);
        AdminController.submitUser({
            data: { accessToken: accessTokenRef.current, userId },
        })
            .then(() => forceReloadPendingUsers())
            .finally(() => setIsLoading(false));
    }, []);

    const declineUser = useCallback((userId: string) => {
        setIsLoading(true);
        AdminController.declineUser({
            data: { accessToken: accessTokenRef.current, userId },
        })
            .then(() => forceReloadPendingUsers())
            .finally(() => setIsLoading(false));
    }, []);

    const table = usePendingUsersTable(pendingUsers, submitUser, declineUser);

    return (
        <>
            <LoadingModal show={isLoading} />
            <Container>
                <Row className="justify-content-center mt-1">
                    <h3>Ожидающие подтверждения</h3>
                </Row>
                <Table className="mt-3" striped bordered hover>
                    <thead>
                        <tr>{tableHeaders}</tr>
                    </thead>
                    <tbody>
                        {table.map((e) => (
                            <tr>{e}</tr>
                        ))}
                    </tbody>
                </Table>
                <ReactPaginate
                    marginPagesDisplayed={1}
                    pageCount={pageCount}
                    pageRangeDisplayed={7}
                    onPageChange={handlePageChange}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    containerClassName={"pagination"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    activeClassName={"active"}
                />
            </Container>
        </>
    );
};

const tableHeaders = [
    <th>Фото</th>,
    <th>Имя Фамилия</th>,
    <th>Описание</th>,
    <th>Навыки</th>,
    <th>Telegram</th>,
    <th></th>,
    <th></th>,
];

import { useState, useCallback } from "react";
import { IPagination } from "../shared/interfaces/pagination";

export const usePagination = () => {
    const [pagination, setPagination] = useState<IPagination>({
        page: 0,
        perPage: 10,
    });
    const handlePageChange = useCallback(
        ({ selected }: { selected: number }) => {
            setPagination((pagination) => ({
                perPage: pagination.perPage,
                page: selected,
            }));
        },
        []
    );

    return {pagination, handlePageChange};
};

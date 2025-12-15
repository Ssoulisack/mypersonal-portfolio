type Pagination<T> = {
    offset?: number;
    limit?: number;
    totalPages?: number | 0;
    page?: number | 0;
    search?: string | "";
    status?: string | null;
    sort?: string | "";
    result: T[];
};

export default Pagination;
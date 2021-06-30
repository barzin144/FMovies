import React from "react";
import { Link } from "react-router-dom";

interface Props {
    url: string,
    page: number;
    totalPages: number
}

const Pagination = ({ page, totalPages, url }: Props) => {
    const pagination = [];
    pagination.push(<Link key={1} className={page === 1 ? 'active' : ''} to={`${url}/page/${1}`}>{1}</Link>);

    const start = page > 4 ? page - 3 : 2;
    const end = totalPages - 1 - page >= 3 ? page + 3 : totalPages - 1;

    if (start > 2) {
        pagination.push(<span key="-1">...</span>);
    }

    for (let index = start; index <= end; index++) {
        pagination.push(<Link key={index} className={page === index ? 'active' : ''} to={`${url}/Page/${index}`}>{index}</Link>);
    }

    if (end < totalPages - 1) {
        pagination.push(<span key="0">...</span>);
    }

    pagination.push(<Link key={totalPages} className={page === totalPages ? 'active' : ''} to={`${url}/page/${totalPages}`}>{totalPages}</Link>);

    return (
        <>
            {totalPages > 0 && <section className="pagination flex flex-jc-c">
                {pagination}
            </section>}
        </>)
}

export default Pagination;
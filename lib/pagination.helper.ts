import { indexOf, isNil } from 'lodash';

export function calculateTotalPages(total: number, limit: number) {
    return Math.floor(total / limit) + (total % limit > 0 ? 1 : 0);
}

export function getPagination(
    currentPage: number,
    total: number,
    limit: number,
) {
    const totalPages = calculateTotalPages(total, limit);

    const prevPage =
        totalPages === 1 || currentPage <= 1 ? null : currentPage - 1;
    const nextPage =
        totalPages === 1 || currentPage >= totalPages ? null : currentPage + 1;

    const pages = [
        prevPage === null || prevPage === 1 ? null : prevPage - 1,
        prevPage,
        currentPage,
        nextPage,
        nextPage === null || nextPage === totalPages ? null : nextPage + 1,
    ].filter(page => !isNil(page));

    const index = indexOf(pages, currentPage);

    if (index === 1) {
        if (pages.length === 4) {
            pages.pop();
        }
    }

    if (index === 2) {
        if (pages.length === 5) {
            pages.shift();
            pages.pop();
        }
        if (pages.length === 4) {
            pages.shift();
        }
    }

    return {
        prevPage,
        pages: pages as number[],
        nextPage,
    };
}

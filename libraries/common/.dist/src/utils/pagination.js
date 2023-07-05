"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function paginate(documents, limit, pageNumber, path, url) {
    return {
        data: documents,
        limit,
        pageNumber,
        next: documents.length < limit ? "" : `${url}${path}?page=${pageNumber + 1}`,
        previous: pageNumber > 1 ? `${url}${path}?page=${pageNumber - 1}` : "",
    };
}
exports.default = paginate;

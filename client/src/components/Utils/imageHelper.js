// import { UPLOAD_URL } from "../../config";

// export const getImageUrl = (url) => {
//     if (!url) return '';
//     return url.startsWith('http') ? url : `${UPLOAD_URL}${url}`;
// };

import { UPLOAD_URL } from "../../config";

export const getImageUrl = (url) => {

    if (!url) return '';


    if (url.startsWith('http')) {
        return url;
    }


    if (url.startsWith('/')) {
        return `${UPLOAD_URL}${url}`;
    }


    return url;
};
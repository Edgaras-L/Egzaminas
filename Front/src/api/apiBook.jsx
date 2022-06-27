import axios from 'axios';

const axiosCategoryBook = axios.create({
    baseURL: 'http://localhost:3000/api/v1/Books',
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

axiosCategoryBook.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        let res = error.response;
        console.error(res.status);
        return Promise.reject(error);
    }
);

export default axiosCategoryBook;
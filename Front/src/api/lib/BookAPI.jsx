import axiosBook from '../apiBook';
// import axios from "axios";

export async function getAllBooks() {
    const res = await axiosBook.get('/');
    return res;
}

export const updateBooks = (data) => axiosBook.patch('/', JSON.stringify(data));

//Book
export async function deleteBook(id) { await axiosBook.patch(`/Book/${id}/delete`) };

export const updateBook = (id, subId, data) => axiosBook.patch(`/Book/${subId}/update`, JSON.stringify(data));

export const addNewBook = (data) => axiosBook.post(`/newBook/addNewBook`, JSON.stringify(data));

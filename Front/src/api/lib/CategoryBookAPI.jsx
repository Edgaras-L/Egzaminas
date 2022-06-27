import axiosCategoryBook from '../apiCategoryBook';
// import axios from "axios";

export async function getAllCategoryBooks() {
    const res = await axiosCategoryBook.get('/');
    return res;
}

export const updateCategoryBooks = (data) => axiosCategoryBook.patch('/', JSON.stringify(data));

//CategoryBook
export async function deleteCategoryBook(id) { await axiosCategoryBook.patch(`/CategoryBook/${id}/delete`) };

export const updateCategoryBook = (id, subId, data) => axiosCategoryBook.patch(`/CategoryBook/${subId}/update`, JSON.stringify(data));

export const addNewCategoryBook = (data) => axiosCategoryBook.post(`/newCategory/addNewCategoryBook`, JSON.stringify(data));

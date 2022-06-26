import axiosRestaurant from '../apiRestaurant';
// import axios from "axios";

export async function getAllRestaurants() {
    const res = await axiosRestaurant.get('/');
    return res;
}

export const updateRestaurants = (data) => axiosRestaurant.post('/', JSON.stringify(data));

//Restaurant
export async function deleteRestaurant(subId) { await axiosRestaurant.patch(`/${subId}/delete`) };

export const updateRestaurant = (id, subId, data) => axiosRestaurant.post(`/${subId}`, JSON.stringify(data));

export const addNewRestaurant = (data) => axiosRestaurant.post(`/addNewRestaurant/`, JSON.stringify(data));

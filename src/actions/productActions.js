import { FETCH_PRODUCTS } from "../types";

export const fetchProducts = () => async (dispatch) => {
    const res = await fetch("/api/products"); // get data from server
    const data = await res.json();
    dispatch({
        type: FETCH_PRODUCTS,
        payload: data,
    });
};
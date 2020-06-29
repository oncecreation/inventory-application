import { DELETE_FROM_CART_SUCCESS, DELETE_FROM_CART_FAILURE } from "../types";
import { tokenConfig } from "../auth-actions/tokenConfig";
import axios from "axios";

export const removeFromCart = productId => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    let params = { productId };
    axios
      .get("/api/users/removeFromCart", tokenConfig(getState, params))
      .then(res => {
        let successMessage = res.data.message;
        let cart = res.data;
        dispatch(removeFromCartSuccess(cart, successMessage));
        resolve(successMessage);
      })
      .catch(err => {
        let errorMessge = err.response.data.message;
        dispatch(removeFromCartFailure(errorMessge));
        reject(errorMessge);
      });
  });
};

const removeFromCartSuccess = (cart, message) => {
  return {
    type: DELETE_FROM_CART_SUCCESS,
    payload: { cart, message }
  };
};

const removeFromCartFailure = error => {
  return {
    type: DELETE_FROM_CART_FAILURE,
    payload: { error }
  };
};

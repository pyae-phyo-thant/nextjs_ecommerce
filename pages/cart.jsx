import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Layout from "../components/layout/Layout";
import { Store } from "../utils/Store";

const cartDetails = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);

    if (data.countInStock < quantity) {
      toast.warning("Sorry, product is out of stock");
      return;
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };

  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const checkoutHandler = () => {
    router.push("/shipping");
  };

  return (
    <Layout title="Shopping Cart">
      <div className="bg-white px-4 mt-10 container mx-auto text-center">
        <p className="font-extrabold text-3xl">Shopping Cart</p>
        {cartItems?.length === 0 ? (
          <div className="mt-4">
            <p>
              Cart is empty.{" "}
              <Link href="/">
                <span className="text-blue-500 cursor-pointer hover:text-blue-700">
                  Go Shopping
                </span>
              </Link>
            </p>
          </div>
        ) : (
          <>
            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cartItems.map((cartItem) => (
                    <li key={cartItem._id} className="py-6 flex">
                      <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                        <Link href={`/product/${cartItem.slug}`} passHref>
                          <img
                            src={cartItem.image}
                            height={150}
                            width={150}
                            className="w-full h-full object-center cursor-pointer object-cover"
                          />
                        </Link>
                      </div>

                      <div className="ml-4 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <Link href={`/product/${cartItem.slug}`}>
                                <p className="cursor-pointer">
                                  {cartItem.name}
                                </p>
                              </Link>
                            </h3>
                            <p className="ml-4">{cartItem.price}</p>
                          </div>
                          <p className="mt-1 text-left text-sm text-gray-500">
                            {cartItem.color}
                          </p>
                        </div>
                        <div className="flex-1 flex items-end justify-between text-sm">
                          <FormControl
                            variant="standard"
                            sx={{ m: 1, minWidth: 40 }}
                          >
                            <InputLabel>Qty</InputLabel>
                            <Select
                              onChange={(e) =>
                                updateCartHandler(cartItem, e.target.value)
                              }
                              value={cartItem.quantity}
                              label="quantity"
                            >
                              {[...Array(cartItem.countInStock).keys()].map(
                                (x) => (
                                  <MenuItem key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </MenuItem>
                                )
                              )}
                            </Select>
                          </FormControl>

                          <div className="flex">
                            <button
                              type="button"
                              onClick={() => removeItemHandler(cartItem)}
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <div className="flex items-center">
                  <p>Subtotal :</p>
                  <p className="text-sm pl-3">
                    {cartItems.reduce((a, c) => a + c.quantity, 0)} items
                  </p>
                </div>
                <p>
                  ${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </p>
              </div>
              <p className="mt-0.5 text-left text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <button
                  onClick={checkoutHandler}
                  className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Checkout
                </button>
              </div>
              <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                <p>
                  or{" "}
                  <Link href="/">
                    <span className="text-indigo-600 cursor-pointer font-medium hover:text-indigo-500">
                      Continue Shopping<span aria-hidden="true"> &rarr;</span>
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default cartDetails;
